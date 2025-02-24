import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './user/entity/user.entity';
import { typeOrmConfig } from './config/typeOrm.config';
import { UserController } from './user/user.controller';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AppController],
  providers: [UserService, AuthService, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}