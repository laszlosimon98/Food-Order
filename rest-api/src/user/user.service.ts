import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { UserRolesEnum } from 'src/enums/roles';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { NewPasswordDto } from 'src/auth/dto/newPassword.dto';

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

    return {
      isSuccess: true,
    };
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

  async getFavoriteFoods(user: any) {
    const { foods } = await this.prismaService.users.findUnique({
      where: {
        userId: user.userId,
      },
      select: {
        foods: {
          include: {
            food: {
              include: {
                categories: true,
                promotions: true,
              },
              omit: {
                categoryId: true,
              },
            },
          },
          omit: {
            userId: true,
            foodId: true,
          },
        },
      },
    });

    return foods.map(({ food }) => {
      return {
        ...food,
      };
    });
  }

  async getFavoriteFoodById(user: any, id: number) {
    return await this.prismaService.foods.findUnique({
      where: {
        foodId: id,
        users: {
          some: {
            userId: user.userId,
          },
        },
      },
    });
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
      throw new UnauthorizedException('Bejelentkezés szükséges!');
    }

    await this.prismaService.users.update({
      where: {
        username,
      },
      data: {
        refreshToken: hashedToken,
      },
    });

    return {
      isSuccess: true,
    };
  }

  async updateUserRole(id: number, role: UserRolesEnum, user: any) {
    if (id === user.user_id) {
      throw new ConflictException();
    }

    await this.prismaService.users.update({
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

    return {
      isSuccess: true,
    };
  }

  async updateUserDetails(
    updateUserDetailsDto: UpdateUserDetailsDto,
    user: any,
  ) {
    await this.prismaService.users.update({
      where: {
        userId: user.userId,
      },
      data: updateUserDetailsDto,
      omit: {
        password: true,
        refreshToken: true,
      },
    });

    return {
      isSuccess: true,
    };
  }

  async changePassword(newPasswordDto: NewPasswordDto, user: any) {
    const { oldPassword, newPassword } = newPasswordDto;
    const currentUser = await this.findUser(user.username);

    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      currentUser.password,
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('Helytelen jelszó!');
    }

    await this.prismaService.users.update({
      where: {
        userId: user.userId,
      },
      data: {
        password: await bcrypt.hash(
          newPassword,
          parseInt(this.configService.getOrThrow('HASHROUND')),
        ),
      },
    });

    return {
      isSuccess: true,
    };
  }

  async deleteUser(id: number, user: any) {
    const userToDelete = await this.prismaService.users.findUnique({
      where: {
        userId: id,
      },
    });

    if (id === user.user_id || userToDelete.role === 'admin') {
      throw new ConflictException('Admin felhasználó nem törölhető!');
    }

    await this.prismaService.users.delete({
      where: {
        userId: id,
      },
      omit: {
        password: true,
        refreshToken: true,
      },
    });

    return {
      isSuccess: true,
    };
  }
}
