import { Module, Global } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { GitHubStrategy } from './strategies/github.strategy.js';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportAuthService } from './passport-auth.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard.js';
import { GitHubAuthGuard } from './guards/github-auth.guard.js';

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
