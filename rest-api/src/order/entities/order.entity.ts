import { ApiProperty } from '@nestjs/swagger';
import { Orders } from '@prisma/client';

export class OrderEntity implements Orders {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  deliveryStatusId: number;

  createdAt: Date;
  updatedAt: Date;
}
