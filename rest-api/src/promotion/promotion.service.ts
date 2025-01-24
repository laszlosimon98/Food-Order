import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PromotionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const { foodIds, ...rest } = createPromotionDto;

    const promotion = await this.prismaService.promotions.create({
      data: rest,
    });

    await this.update(promotion.id, createPromotionDto);
    return promotion;
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const { foodIds, ...rest } = updatePromotionDto;

    if (foodIds) {
      return await this.prismaService.promotions.update({
        where: {
          id,
        },
        data: {
          ...rest,
          foods: {
            connect: [
              ...foodIds.map((foodId) => {
                return {
                  id,
                };
              }),
            ],
          },
        },
      });
    }

    await this.prismaService.promotions.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    return {
      isSuccess: true,
    };
  }
}
