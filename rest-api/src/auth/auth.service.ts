import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generatePayload(user: any) {
    return {
      sub: user.user_id,
      fullname: user.fullname,
      username: user.username,
      role: user.role,
    };
  }

  generateAccessToken(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${parseInt(this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION'))}ms`,
    });

    return accessToken;
  }

  async generateRefreshToken(payload: any, response: Response) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${parseInt(this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION'))}ms`,
    });

    const refreshTokenExpirationDate = new Date(
      new Date().getTime() +
        new Date(
          parseInt(
            this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION'),
          ),
        ).getTime(),
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: refreshTokenExpirationDate,
    });

    await this.userService.updateRefreshToken(payload.username, refreshToken);
  }

  async register(registerDto: RegisterDto) {
    return await this.userService.createUser(registerDto);
  }

  async login(user: any, response: Response) {
    const payload = this.generatePayload(user);

    this.generateRefreshToken(payload, response);
    const accessToken = this.generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  async refresh(user: any) {
    const payload = this.generatePayload(user);
    const accessToken = this.generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  async logout(user: any) {
    await this.userService.updateRefreshToken(user.username, null);
    return true;
  }

  async validateUser(username: string, pwd: string) {
    const user = await this.userService.findUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pwd, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const { password, refreshToken, ...rest } = user;
    return rest;
  }

  async validateRefreshToken(username: string, token: string) {
    const user = await this.userService.findUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenValid = await bcrypt.compare(token, user.refreshToken);

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException();
    }

    const { password, refreshToken, ...rest } = user;
    return rest;
  }
}
