import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodService } from 'src/food/food.service';
import { DateTime } from 'luxon';

@Injectable()
export class PromotionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly foodService: FoodService,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const { foodIds, ...rest } = createPromotionDto;

    const promotion = await this.prismaService.promotions.create({
      data: {
        ...rest,
      },
    });

    await this.update(promotion.promotionId, createPromotionDto);
    return promotion;
  }

  async findAll() {
    return await this.prismaService.promotions.findMany({
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
