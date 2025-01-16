import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.prismaService.categories.create({
      data: createCategoryDto,
    });

    return {
      isSuccess: true,
    };
  }

  async findAll() {
    return await this.prismaService.categories.findMany({
      orderBy: {
        categoryId: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.categories.findUnique({
      where: {
        categoryId: id,
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.prismaService.categories.update({
      where: {
        categoryId: id,
      },
      data: updateCategoryDto,
    });

    return {
      isSuccess: true,
    };
  }

  async remove(id: number) {
    await this.prismaService.categories.delete({
      where: {
        categoryId: id,
      },
    });

    return {
      isSuccess: true,
    };
  }
}
