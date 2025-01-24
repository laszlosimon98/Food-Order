import { ApiProperty } from '@nestjs/swagger';
import { Foods } from '@prisma/client';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';

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
  rating: number;

  @ApiProperty()
  orderItemId: number;

  categoryId: number;
  createdAt: Date;
  updatedAt: Date;

  @ApiProperty({ type: CategoryEntity })
  categories: CategoryEntity;

  @ApiProperty({ type: PromotionEntity, isArray: true })
  promotions: PromotionEntity[];
}
