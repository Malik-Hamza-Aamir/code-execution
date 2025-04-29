import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonRepository } from './common.repository';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [CommonRepository],
})
export class CommonRepositoryModule {}
