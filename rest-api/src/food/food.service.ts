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
