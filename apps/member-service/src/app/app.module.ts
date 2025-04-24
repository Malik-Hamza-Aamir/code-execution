import { Module } from '@nestjs/common';
import { PassportAuthModule } from '@code-execution/passport-auth';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    PassportAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [PassportAuthModule],
})
export class AppModule {}
