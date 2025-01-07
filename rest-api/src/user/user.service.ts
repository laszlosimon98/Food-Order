import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { UserRoles } from 'src/enums/roles';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(this.configService.getOrThrow('HASHROUND')),
    );

    const user = await this.findUser(username);

    if (user) {
      throw new ConflictException('User already registered');
    }

    await this.prismaService.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });

    return true;
  }

  async getAllUsers() {
    return await this.prismaService.user.findMany({
      omit: {
        password: true,
        refreshToken: true,
        username: true,
      },
    });
  }

  async findUser(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async updateRefreshToken(username: string, token: string) {
    const user = await this.findUser(username);
    const hashedToken = await bcrypt.hash(
      token,
      parseInt(this.configService.getOrThrow('HASHROUND')),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.prismaService.user.update({
      where: {
        username,
      },
      data: {
        refreshToken: token ? hashedToken : '',
      },
    });

    return true;
  }

  async updateUserRole(id: number, role: UserRoles, user: any) {
    if (id === user.user_id) {
      throw new ConflictException();
    }

    return await this.prismaService.user.update({
      where: {
        user_id: id,
      },
      data: {
        role,
      },
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }

  async deleteUser(id: number, user: any) {
    const userToDelete = await this.prismaService.user.findUnique({
      where: {
        user_id: id,
      },
    });

    if (id === user.user_id || userToDelete.role === 'admin') {
      throw new ConflictException();
    }

    return await this.prismaService.user.delete({
      where: {
        user_id: id,
      },
    });
  }
}
