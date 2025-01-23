import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus, Orders } from '@prisma/client';
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';

export class OrderEntity implements Orders {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  totalOrderPrice: number;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phoneNumber: string;

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
