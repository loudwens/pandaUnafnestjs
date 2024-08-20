import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  imports: [], // Pas besoin de TypeOrmModule
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
