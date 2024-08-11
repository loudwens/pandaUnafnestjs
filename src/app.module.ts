import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Type de base de données MySQL
      host: 'localhost', // L'adresse du serveur MySQL
      port: 3306, // Le port par défaut de MySQL
      username: 'root', // Remplacez par votre nom d'utilisateur MySQL
      password: 'dl1102tech!', // Remplacez par votre mot de passe MySQL
      database: 'nesjs_panda', // Remplacez par le nom de votre base de données MySQL
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Les entités TypeORM
      synchronize: true, // Synchroniser les entités avec la base de données, utile pour le développement
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule, 
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
