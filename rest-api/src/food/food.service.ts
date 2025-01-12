import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFoodDto: CreateFoodDto) {
    await this.prismaService.foods.create({
      data: createFoodDto,
    });

    return {
      success: true,
    };
  }

  async findAll(
    isOnPromotion?: boolean,
    minValue?: number,
    maxValue?: number,
    isSpice?: boolean,
    isVegetarian?: boolean,
    categoryId?: number,
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
        categoryId: categoryId ? categoryId : undefined,
      },
      include: {
        categories: true,
        promotions: {
          select: {
            promotionId: true,
            discountValue: true,
            isActive: true,
          },
        },
      },
      omit: {
        categoryId: true,
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
        reviews: {
          include: {
            user: {
              select: {
                userId: true,
                fullname: true,
              },
            },
          },
          omit: {
            userId: true,
            foodId: true,
          },
        },
        promotions: true,
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
        categories: true,
        promotions: {
          select: {
            promotionId: true,
            discountValue: true,
            isActive: true,
          },
        },
      },
      orderBy: {
        orderItems: {
          _count: 'desc',
        },
      },
      omit: {
        categoryId: true,
      },
      take: 10,
    });

    return topTenFoods.map((food) => {
      const { _count, ...rest } = food;
      return rest;
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
    await this.prismaService.foods.update({
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

    return {
      success: true,
    };
  }

  async remove(id: number) {
    await this.prismaService.foods.delete({
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

    return {
      success: true,
    };
  }
}
