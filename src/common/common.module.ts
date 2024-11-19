import { Module } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
