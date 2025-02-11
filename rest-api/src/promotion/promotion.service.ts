import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodService } from 'src/food/food.service';
import { fromZonedTime } from 'date-fns-tz';

@Injectable()
export class PromotionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly foodService: FoodService,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const { foodIds, startDate, endDate, ...rest } = createPromotionDto;

    const localStart = fromZonedTime(startDate, 'Europe/Budapest');
    const localEnd = fromZonedTime(endDate, 'Europe/Budapest');

    const promotion = await this.prismaService.promotions.create({
      data: {
        ...rest,
        startDate: localStart,
        endDate: localEnd,
      },
    });

    await this.update(promotion.promotionId, createPromotionDto);
    return promotion;
  }

  async findAll(filter?: any) {
    return await this.prismaService.promotions.findMany({
      where: filter,
      include: {
        foods: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.promotions.findUnique({
      where: {
        promotionId: id,
      },
      include: {
        foods: true,
      },
    });
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const { foodIds, discountValue, ...rest } = updatePromotionDto;
    const ids = foodIds.map((foodId) => {
      return {
        foodId,
      };
    });

    if (foodIds) {
      const result = await this.prismaService.promotions.update({
        where: {
          promotionId: id,
        },
        data: {
          ...rest,
          discountValue,
          foods: {
            connect: ids,
          },
        },
      });

      await this.foodService.updateDiscountPrice(foodIds, discountValue);
      return result;
    }

    await this.prismaService.promotions.update({
      where: {
        promotionId: id,
      },
      data: {
        ...rest,
      },
    });

    return {
      isSuccess: true,
    };
  }

  async delete(id: number) {
    return await this.prismaService.promotions.delete({
      where: {
        promotionId: id,
      },
    });
  }
}
