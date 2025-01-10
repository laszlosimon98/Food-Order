import { ApiProperty } from '@nestjs/swagger';
import { OrderItems } from '@prisma/client';

export class OrderItemEntity implements OrderItems {
  @ApiProperty()
  orderItemId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  orderId: number;

  @ApiProperty()
  foodId: number;

  createdAt: Date;
  updatedAt: Date;
}
