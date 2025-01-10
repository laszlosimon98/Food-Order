import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { RoleEnum } from 'src/enums/roles';
import { OrderItemEntity } from './entities/order-item.entity';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderItemEntity })
  @Roles(RoleEnum.User)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderItemEntity })
  @Roles(RoleEnum.User)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.remove(id);
  }
}
