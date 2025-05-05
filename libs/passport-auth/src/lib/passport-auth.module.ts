import { Module, Global } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GitHubStrategy } from './strategies/github.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportAuthService } from './passport-auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';
import { GitHubAuthGuard } from './guards/github-auth.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard, JwtRefreshStrategy, JwtRefreshGuard,PassportAuthService, GitHubStrategy, GitHubAuthGuard],
  exports: [JwtStrategy, JwtModule, PassportAuthService, JwtAuthGuard, JwtRefreshGuard, GitHubStrategy, GitHubAuthGuard],
})
export class PassportAuthModule {}
