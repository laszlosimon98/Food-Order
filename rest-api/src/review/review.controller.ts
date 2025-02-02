import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/roles';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Public } from 'src/decorators/public/public.decorator';
import { ReviewEntity } from './entities/review.entity';
import { Request } from 'express';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  @Roles(RoleEnum.User)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    return this.reviewService.create(createReviewDto, req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity })
  @Roles(RoleEnum.User)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.reviewService.findOne(id, req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity })
  @Roles(RoleEnum.User)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req: Request,
  ) {
    return this.reviewService.update(id, updateReviewDto, req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity })
  @Roles(RoleEnum.Employee)
  @Delete('comment/:id')
  removeUnAppropriateComment(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.removeUnAppropriateComment(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity })
  @Roles(RoleEnum.User)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.reviewService.remove(id, req.user);
  }
}
