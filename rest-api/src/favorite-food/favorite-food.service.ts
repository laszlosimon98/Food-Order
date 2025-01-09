import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteFoodDto } from './dto/create-favorite-food.dto';

@Injectable()
export class FavoriteFoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async add(createFavoriteFoodDto: CreateFavoriteFoodDto, user: any) {
    const { foodId } = createFavoriteFoodDto;

    // return await this.prismaService.foods.update({
    //   where: {
    //     foodId,
    //   },
    //   data: {
    //     users: {
    //       create: {
    //         addedAt: new Date(),
    //         user: {
    //           connect: {
    //             userId: user.userId,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    return await this.prismaService.userFavoriteFoods.create({
      data: {
        addedAt: new Date(),
        userId: user.userId,
        foodId,
      },
    });
  }

  async remove(id: number, user: any) {
    return await this.prismaService.userFavoriteFoods.delete({
      where: {
        userId_foodId: {
          userId: user.userId,
          foodId: id,
        },
      },
    });
  }
}
