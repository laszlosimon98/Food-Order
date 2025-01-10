import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { FoodEntity } from './entities/food.entity';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { RoleEnum } from 'src/enums/roles';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FoodEntity })
  @Roles(RoleEnum.Admin)
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Public()
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Public()
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Get('/category/:id')
  findByCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.foodService.findByCategory(categoryId);
  }

  @Public()
  @ApiOkResponse({ type: FoodEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: FoodEntity })
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.update(id, updateFoodDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: FoodEntity })
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.remove(id);
  }
}
