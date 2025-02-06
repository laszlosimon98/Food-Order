import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      await this.prismaService.categories.create({
        data: createCategoryDto,
      });
    } catch (error) {
      throw new ConflictException('A kategória már létezik!', {
        cause: error,
      });
    }

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
    try {
      await this.prismaService.categories.update({
        where: {
          categoryId: id,
        },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new NotFoundException('A kategória nem létezik!', {
        cause: error,
      });
    }

    return {
      isSuccess: true,
    };
  }

  async remove(id: number) {
    try {
      await this.prismaService.categories.delete({
        where: {
          categoryId: id,
        },
      });
    } catch (error) {
      if (error.meta.field_name === 'foreign key') {
        throw new BadRequestException(
          'A kategória nem törölhető! A kategóriához tartozik étel!',
        );
      }
      throw new NotFoundException('A kategória nem létezik!', {
        cause: error,
      });
    }

    return {
      isSuccess: true,
    };
  }
}
