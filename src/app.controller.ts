import {
  Controller,
  Get,
  UseGuards,
  Req,
  Render,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { Request, response } from "express";

@Controller()
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  @Render("index")
  getProfile(@Req() req: Request) {
    return { user: req.user };
  }
}
