import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodService } from 'src/food/food.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly foodService: FoodService,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: any) {
    await this.prismaService.reviews.create({
      data: {
        ...createReviewDto,
        userId: user.userId,
      },
    });

    const food = await this.foodService.findOne(createReviewDto.foodId);

    const rating =
      food.reviews.reduce((previous, current) => previous + current.rating, 0) /
      food.reviews.length;

    await this.foodService.update(food.foodId, { rating });

    return {
      success: true,
    };
  }

  async findOne(id: number) {
    return await this.prismaService.reviews.findUnique({
      where: {
        reviewId: id,
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, user: any) {
    const review = await this.findOne(id);

    if (review.userId !== user.userId) {
      throw new UnauthorizedException();
    }

    await this.prismaService.reviews.update({
      where: {
        reviewId: id,
      },
      data: updateReviewDto,
    });

    return {
      success: true,
    };
  }

  async removeUnAppropriateComment(id: number) {
    await this.prismaService.reviews.update({
      where: {
        reviewId: id,
      },
      data: {
        reviewText:
          'A moderátor törölte a kommentet, helytelen nyelvezett használata miatt!',
      },
    });

    return {
      success: true,
    };
  }

  async remove(id: number, user: any) {
    const review = await this.findOne(id);

    if (review.userId !== user.userId) {
      throw new UnauthorizedException();
    }

    await this.prismaService.reviews.delete({
      where: {
        reviewId: id,
      },
    });

    return {
      success: true,
    };
  }
}
