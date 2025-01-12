import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteFoodDto } from './dto/create-favorite-food.dto';

@Injectable()
export class FavoriteFoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async add(createFavoriteFoodDto: CreateFavoriteFoodDto, user: any) {
    const { foodId } = createFavoriteFoodDto;

    await this.prismaService.favoritesOnFoods.create({
      data: {
        addedAt: new Date(),
        userId: user.userId,
        foodId,
      },
    });

    return {
      success: true,
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
      success: true,
    };
  }
}
