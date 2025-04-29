import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { PrismaModule } from '../shared/prisma/prisma.module.js';
import { PassportAuthModule } from '@code-execution/passport-auth';
import { CommonRepositoryModule } from '../shared/repository/common-repository.module.js';

@Module({
  imports: [
    PassportAuthModule,
    CommonRepositoryModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
