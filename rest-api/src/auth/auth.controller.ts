import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from 'src/guards/auth/local.guard';
import { Public } from 'src/decorators/public/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtRefreshAuthGuard } from 'src/guards/auth/jwt-refresh.guard';
import { Response } from 'express';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _loginDto: LoginDto,
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(req.user, response);
  }

  @Public()
  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Req() req) {
    return await this.authService.refresh(req.user);
  }

  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req) {
    return await this.authService.logout(req.user);
  }

  @ApiBearerAuth()
  @Get('currentUser')
  getCurrentUser(@Req() req) {
    return req.user;
  }
}
