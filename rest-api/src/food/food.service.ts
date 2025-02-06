import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderType } from 'src/types/order.type';

@Injectable()
export class FoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFoodDto: CreateFoodDto) {
    try {
      return await this.prismaService.foods.create({
        data: createFoodDto,
      });
    } catch (error) {
      throw new ConflictException('Az étel már létezik!', {
        cause: error,
      });
    }
  }

  async findAll(
    categoryId?: number,
    minValue?: number,
    maxValue?: number,
    isOnPromotion?: boolean,
    isSpice?: boolean,
    isVegetarian?: boolean,
    hasRating?: boolean,
    orderByPrice?: OrderType,
    orderByRating?: OrderType,
    page?: number,
    limit?: number,
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
        rating: {
          not: hasRating ? null : undefined,
        },
      },
      orderBy: {
        price: orderByPrice,
        rating: orderByRating,
      },
      include: {
        categories: true,
        promotions: true,
      },
      omit: {
        categoryId: true,
      },
      skip: page ? limit * (page - 1) : 0,
      take: limit ? limit : undefined,
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
        },
        promotions: true,
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

  async getFoodCount() {
    return await this.prismaService.foods.count();
  }

  async getFoodByIds(ids: number[]) {
    return await this.prismaService.foods.findMany({
      where: {
        foodId: {
          in: ids,
        },
      },
    });
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    try {
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
    } catch (error) {
      throw new ConflictException('Az étel nem létezik!', {
        cause: error,
      });
    }
  }

  async remove(id: number) {
    try {
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
    } catch (error) {
      throw new ConflictException('Az étel nem létezik!', {
        cause: error,
      });
    }

    return {
      isSuccess: true,
    };
  }
}
