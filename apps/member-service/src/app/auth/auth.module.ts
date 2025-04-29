import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthRepository } from './auth.repository.js';
import { PrismaModule } from '../shared/prisma/prisma.module.js';
import { PassportAuthModule } from '@code-execution/passport-auth';

@Module({
  imports: [
    PassportAuthModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
