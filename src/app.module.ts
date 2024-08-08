import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'; // Assurez-vous que le chemin est correct

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dl1102tech!',
      database: 'nesjs_database',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UserModule, // Ajoute le module User
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
