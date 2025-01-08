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
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PromotionEntity } from './entities/promotion.entity';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Public()
  @ApiCreatedResponse({ type: PromotionEntity })
  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Public()
  @ApiOkResponse({ type: PromotionEntity, isArray: true })
  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Public()
  @ApiOkResponse({ type: PromotionEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.promotionService.findOne(id);
  }

  @Public()
  @ApiOkResponse({ type: PromotionEntity })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionService.update(id, updatePromotionDto);
  }

  @Public()
  @ApiOkResponse({ type: PromotionEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.promotionService.remove(id);
  }
}
