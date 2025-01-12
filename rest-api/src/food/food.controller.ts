import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
  Req,
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
import { OptionalBoolPipe } from 'src/pipes/optional-bool/optional-bool.pipe';
import { NotNegativePipe } from 'src/pipes/not-negative/not-negative.pipe';
import { OptionalNumberPipe } from 'src/pipes/optional-number/optional-number.pipe';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { OrderType } from 'src/types/order.type';
import { OrderPipe } from 'src/pipes/order/order.pipe';

@Controller('food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly userService: UserService,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FoodEntity })
  @Roles(RoleEnum.Admin)
  @Post()
  async create(@Body() createFoodDto: CreateFoodDto) {
    return await this.foodService.create(createFoodDto);
  }

  @Public()
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @ApiQuery({
    name: 'isOnPromotion',
    required: false,
  })
  @ApiQuery({
    name: 'minValue',
    required: false,
  })
  @ApiQuery({
    name: 'maxValue',
    required: false,
  })
  @ApiQuery({
    name: 'isSpice',
    required: false,
  })
  @ApiQuery({
    name: 'isVegetarian',
    required: false,
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
  })
  @ApiQuery({
    name: 'orderByPrice',
    required: false,
  })
  @ApiQuery({
    name: 'orderByRating',
    required: false,
  })
  @ApiQuery({
    name: 'hasRating',
    required: false,
  })
  @Get()
  async findAll(
    @Query('isOnPromotion', OptionalBoolPipe) isOnPromotion?: boolean,
    @Query('minValue', OptionalNumberPipe, NotNegativePipe) minValue?: number,
    @Query('maxValue', OptionalNumberPipe) maxValue?: number,
    @Query('isSpice', OptionalBoolPipe) isSpice?: boolean,
    @Query('isVegetarian', OptionalBoolPipe) isVegetartian?: boolean,
    @Query('categoryId', OptionalNumberPipe) categoryId?: number,
    @Query('orderByPrice', OrderPipe) orderByPrice?: OrderType,
    @Query('orderByRating', OrderPipe) orderByRating?: OrderType,
    @Query('hasRating', OptionalBoolPipe) hasRating?: boolean,
  ) {
    return await this.foodService.findAll(
      isOnPromotion,
      minValue,
      maxValue,
      isSpice,
      isVegetartian,
      categoryId,
      orderByPrice,
      orderByRating,
      hasRating,
    );
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @Get('favoriteFood')
  async getFavoriteFoods(@Req() req: Request) {
    return await this.userService.getFavoriteFoods(req.user);
  }

  @Public()
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Get('/topTenOrder')
  async getTOpTenOrder() {
    return await this.foodService.getTopTenOrder();
  }

  @Public()
  @ApiOkResponse({ type: FoodEntity })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.foodService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: FoodEntity })
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return await this.foodService.update(id, updateFoodDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: FoodEntity })
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.foodService.remove(id);
  }
}
