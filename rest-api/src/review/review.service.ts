import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const food = await this.foodService.findOne(createReviewDto.foodId);

    if (!food) {
      throw new NotFoundException('A keresett étel nem található!');
    }
    await this.prismaService.reviews.create({
      data: {
        ...createReviewDto,
        userId: user.userId,
      },
    });

    const rating =
      food.reviews.reduce((previous, current) => previous + current.rating, 0) /
      food.reviews.length;

    await this.foodService.update(food.id, { rating });

    return {
      isSuccess: true,
    };
  }

  async findOne(id: number) {
    return await this.prismaService.reviews.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, user: any) {
    const review = await this.findOne(id);

    if (review.userId !== user.userId) {
      throw new UnauthorizedException('Bejelentkezés szükséges!');
    }

    if (!review.isEditable) {
      throw new BadRequestException('A komment nem módosítható!');
    }

    await this.prismaService.reviews.update({
      where: {
        id,
      },
      data: updateReviewDto,
    });

    return {
      isSuccess: true,
    };
  }

  async removeUnAppropriateComment(id: number) {
    await this.prismaService.reviews.update({
      where: {
        id,
      },
      data: {
        reviewText:
          'A moderátor törölte a kommentet, helytelen nyelvezett használata miatt!',
      },
    });

    return {
      isSuccess: true,
    };
  }

  async remove(id: number, user: any) {
    const review = await this.findOne(id);

    if (review.userId !== user.userId) {
      throw new UnauthorizedException('Bejelentkezés szükséges!');
    }

    if (!review.isEditable) {
      throw new BadRequestException('A komment nem módosítható!');
    }

    await this.prismaService.reviews.delete({
      where: {
        id,
      },
    });

    return {
      isSuccess: true,
    };
  }
}
