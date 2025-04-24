import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto.js';
import { GenericResponseDto } from './dto/generic-response.dto/generic-response.dto.js';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto.js';
import type { Request, Response } from 'express';
import {
  GitHubAuthGuard,
  JwtAuthGuard,
  JwtRefreshGuard,
} from '@code-execution/passport-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUsers(@Body() createUserDto: CreateUserDto) {
    const registeredUser = await this.authService.register(createUserDto);
    return new GenericResponseDto(
      true,
      'User Registered Successfully',
      registeredUser
    );
  }

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.login(loginUserDto);
    if (!result.success) {
      res.status(HttpStatus.UNAUTHORIZED);
      return new GenericResponseDto(
        false,
        result.message || 'Authentication failed'
      );
    }

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: false, // process.env.NODE_ENV === 'production'
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return new GenericResponseDto(true, 'Login successful', {
      token: result.token,
      redirectUrl: '/',
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user;
    console.log('[user]', user);

    const tokens = await this.authService.getNewTokens(user);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return new GenericResponseDto(true, 'Token refreshed successfully', {
      token: tokens.accessToken,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logoutUser(@Body() id: string, @Res() res: Response) {
    await this.authService.logout(Number(id), res);
    return new GenericResponseDto(true, 'Logout Successful', {
      redirectUrl: '/login',
    });
  }

  @Get('github')
  @UseGuards(GitHubAuthGuard)
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(GitHubAuthGuard)
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.generateJwt(req.user);
    console.log('[token]', token);
    return 'res.redirect(`http://yourfrontend.com?token=${token}`)';
  }
}
