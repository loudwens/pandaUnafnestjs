import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Ajoute le module TypeORM pour l'entité User
  ],
  controllers: [UserController], // Déclare les contrôleurs
  providers: [UserService], // Déclare les services
  exports: [UserService], // Exporte le service pour qu'il puisse être utilisé dans d'autres modules
})
export class UserModule {}
