import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserModel } from 'src/db/models/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModel],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
