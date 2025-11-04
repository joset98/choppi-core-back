import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return {
      success: true,
      token: result.access_token,
      user: req.user,
    };
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const user = await this.authService.createUser(body.email, body.password);
    const { password, ...result } = user;
    return result;
  }
}