import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteFoodDto } from './dto/create-favorite-food.dto';

@Injectable()
export class FavoriteFoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async add(createFavoriteFoodDto: CreateFavoriteFoodDto, user: any) {
    const { foodId } = createFavoriteFoodDto;

    const food = await this.prismaService.foods.findUnique({
      where: {
        foodId,
      },
    });

    if (!food) {
      throw new NotFoundException('A keresett étel nem található!');
    }

    await this.prismaService.favoritesOnFoods.create({
      data: {
        addedAt: new Date(),
        userId: user.userId,
        foodId,
      },
    });

    return {
      isSuccess: true,
    };
  }

  async remove(id: number, user: any) {
    await this.prismaService.favoritesOnFoods.delete({
      where: {
        userId_foodId: {
          userId: user.userId,
          foodId: id,
        },
      },
    });

    return {
      isSuccess: true,
    };
  }
}
