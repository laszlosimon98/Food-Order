import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus, Orders } from '@prisma/client';
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';

export class OrderEntity implements Orders {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  userId: number;

  deliveryStatusId: number;

  @ApiProperty()
  deliveryStatus: DeliveryStatus;

  @ApiProperty({ type: OrderItemEntity, isArray: true })
  orderItems: OrderItemEntity[];

  createdAt: Date;
  updatedAt: Date;
}
