import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/domains/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: Omit<CreateUserDto, 'role' | 'name'>) {
    return await this.authService.login(body.email, body.password);
  }
}
