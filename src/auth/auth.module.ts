import { Module } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from 'src/auth/auth.controller';
import { JwtStrategy } from 'src/Strategy/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}