import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoriteFoodService } from './favorite-food.service';
import { CreateFavoriteFoodDto } from './dto/create-favorite-food.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/roles';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Request } from 'express';

@Controller('favorite-food')
export class FavoriteFoodController {
  constructor(private readonly favoriteFoodService: FavoriteFoodService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @Post()
  add(
    @Body() createFavoriteFoodDto: CreateFavoriteFoodDto,
    @Req() req: Request,
  ) {
    return this.favoriteFoodService.add(createFavoriteFoodDto, req.user);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.favoriteFoodService.remove(id, req.user);
  }
}
