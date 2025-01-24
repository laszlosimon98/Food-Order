import { ApiProperty } from '@nestjs/swagger';
import { OrderItems } from '@prisma/client';
import { FoodEntity } from 'src/food/entities/food.entity';

export class OrderItemEntity implements OrderItems {
  @ApiProperty()
  orderItemId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  totalPrice: number;

  orderId: number;
  foodId: number;

  createdAt: Date;
  updatedAt: Date;

  @ApiProperty({ type: FoodEntity })
  foods: FoodEntity;
}
