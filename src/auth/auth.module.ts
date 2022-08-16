import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config(`${process.env.PRIVATE_KEY}`);

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports:[
    UsersModule,
    JwtModule.register({
      secret: `${process.env.PRIVATE_KEY}`,
      signOptions:{
        expiresIn:'24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
]
})
export class AuthModule {}
