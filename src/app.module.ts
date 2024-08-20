import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProjectsModule,
    TasksModule,
   
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
