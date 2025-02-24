import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}