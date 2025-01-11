import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFoodDto: CreateFoodDto) {
    return await this.prismaService.foods.create({
      data: createFoodDto,
    });
  }

  async findAll() {
    return await this.prismaService.foods.findMany({
      include: {
        categories: true,
        reviews: true,
        users: true,
        promotions: true,
      },
      omit: {
        categoryId: true,
      },
    });
  }

  async findByCategory(categoryId: number) {
    return await this.prismaService.foods.findMany({
      where: {
        categoryId,
      },
      include: {
        reviews: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.foods.findUnique({
      where: {
        foodId: id,
      },
      include: {
        categories: true,
        reviews: true,
      },
      omit: {
        categoryId: true,
      },
    });
  }

  async getTopTenOrder() {
    const topTenFoods = await this.prismaService.foods.findMany({
      where: {
        orderItems: {
          some: {},
        },
      },
      include: {
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
      orderBy: {
        orderItems: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    return topTenFoods.map((food) => {
      const { _count, ...rest } = food;
      return rest;
    });
  }

  async getPromotions(
    isOnPromotion?: boolean,
    minValue?: number,
    maxValue?: number,
    isSpice?: boolean,
    isVegetarian?: boolean,
  ) {
    return await this.prismaService.foods.findMany({
      where: {
        promotions: isOnPromotion
          ? {
              some: {
                isActive: isOnPromotion,
              },
            }
          : undefined,
        price: {
          gte: minValue ? minValue : undefined,
          lte: maxValue ? maxValue : undefined,
        },
        isSpice,
        isVegetarian,
      },
      include: {
        promotions: true,
      },
    });
  }

  async getTopThreeReviewsFoods() {
    const result = [];

    const topThree = await this.prismaService.foods.findMany({
      where: {
        reviews: {
          some: {},
        },
      },
      include: {
        reviews: true,
      },
      take: 3,
    });

    const raitings = await this.prismaService.reviews.groupBy({
      by: ['foodId'],
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: 'desc',
        },
      },
      take: 3,
    });

    for (const food of topThree) {
      for (const raiting of raitings) {
        if (food.foodId === raiting.foodId) {
          const item = {
            ...food,
            ...raiting,
          };

          result.push(item);
        }
      }
    }

    return result;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    return await this.prismaService.foods.update({
      where: {
        foodId: id,
      },
      data: updateFoodDto,
      include: {
        categories: true,
      },
      omit: {
        categoryId: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.foods.delete({
      where: {
        foodId: id,
      },
      include: {
        categories: true,
      },
      omit: {
        categoryId: true,
      },
    });
  }
}
