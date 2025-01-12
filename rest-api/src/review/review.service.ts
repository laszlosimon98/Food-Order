import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, user: any) {
    await this.prismaService.reviews.create({
      data: {
        ...createReviewDto,
        userId: user.userId,
      },
    });

    return {
      success: true,
    };
  }

  async findAll() {
    return await this.prismaService.reviews.findMany();
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
