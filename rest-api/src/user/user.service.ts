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

    await this.prismaService.users.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });

    return true;
  }

  async getAllUsers() {
    return await this.prismaService.users.findMany({
      omit: {
        password: true,
        refreshToken: true,
        username: true,
      },
    });
  }

  async findUser(username: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async updateRefreshToken(username: string, token: string | null) {
    const user = await this.findUser(username);
    let hashedToken: string | null = null;

    if (token) {
      hashedToken = await bcrypt.hash(
        token,
        parseInt(this.configService.getOrThrow('HASHROUND')),
      );
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.prismaService.users.update({
      where: {
        username,
      },
      data: {
        refreshToken: hashedToken,
      },
    });

    return true;
  }

  async updateUserRole(id: number, role: UserRoles, user: any) {
    if (id === user.user_id) {
      throw new ConflictException();
    }

    return await this.prismaService.users.update({
      where: {
        userId: id,
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
    const userToDelete = await this.prismaService.users.findUnique({
      where: {
        userId: id,
      },
    });

    if (id === user.user_id || userToDelete.role === 'admin') {
      throw new ConflictException();
    }

    return await this.prismaService.users.delete({
      where: {
        userId: id,
      },
    });
  }
}
