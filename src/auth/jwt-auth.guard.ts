import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
  } from "@nestjs/common";
  import { AuthGuard } from "@nestjs/passport";
  import { Request, Response } from "express";
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }
  
    handleRequest(err, user, info, context: ExecutionContext) {
      const response = context.switchToHttp().getResponse<Response>();
      const request = context.switchToHttp().getRequest<Request>();
  
      if (err || !user) {
        response.redirect('/user/unauthorized');
        throw new UnauthorizedException(); // Ensure the guard throws an exception
      }
      return user;
    }
  }
  