import { Controller, Post, Body, Res, Get, Render, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { AuthService } from "../auth/auth.service";
import { User } from "./entity/user.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get("register")
  @Render("register")
  registerPage() {}

  @Get("unauthorized")
  @Render("unauthorized") 
  getUnauthorized() {
  }

  @Post("register")
  async register(@Body() user: User, @Res() res: Response) {
    await this.userService.create(user);
    res.redirect("/user/login");
  }

  @Get("login")
  @Render("login")
  loginPage() {}

  @Post("login")
  async login(@Body() body: any, @Res() res: Response) {
    const user = await this.authService.validateUser(
      body.username,
      body.password
    );
    if (user) {
      const token = await this.authService.login(user);
      res.cookie("jwt", token.access_token, { httpOnly: true });
      res.redirect("/");
    } else {
      res.redirect("/user/login");
    }
  }

  @Get("logout")
  logout(@Res() res: Response) {
    res.clearCookie("jwt");
    res.redirect("/user/login");
  }
}
