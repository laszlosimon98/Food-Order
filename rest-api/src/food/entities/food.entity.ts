import { ApiProperty } from '@nestjs/swagger';
import { Foods } from '@prisma/client';

export class FoodEntity implements Foods {
  @ApiProperty()
  foodId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  isSpice: boolean;

  @ApiProperty()
  isVegetarian: boolean;

  @ApiProperty()
  orderItemId: number;

  @ApiProperty()
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
