import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { RoleEnum } from 'src/enums/roles';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { Request } from 'express';
import { StatusEnum } from 'src/enums/status';
import { OrderEntity } from 'src/order/entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @ApiCreatedResponse({ type: CreateOrderDto })
  @ApiBody({
    type: [CreateOrderItemDto],
  })
  @Post()
  async create(
    @Body() createOrderItemDto: CreateOrderItemDto[],
    @Req() req: Request,
  ) {
    return await this.orderService.create(createOrderItemDto, req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  @Roles(RoleEnum.Employee)
  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  @Roles(RoleEnum.User)
  @Get('myOrders')
  async findMyOrders(@Req() req: Request) {
    return await this.orderService.findMyOrders(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity })
  @Roles(RoleEnum.User, RoleEnum.Employee)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'status',
    enum: StatusEnum,
    enumName: 'Status',
  })
  @Roles(RoleEnum.Employee)
  @Patch('updateStatus/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: StatusEnum,
  ) {
    return await this.orderService.updateStatus(id, status);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.remove(id);
  }
}
