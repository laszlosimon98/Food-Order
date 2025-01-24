import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { FoodEntity } from 'src/food/entities/food.entity';

export class FavoriteFoodEntity implements Users {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;
  username: string;
  password: string;

  @ApiProperty()
  role: string;

  refreshToken: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  address: string;

  createdAt: Date;
  updatedAt: Date;

  @ApiProperty()
  foods: {
    addedAt: string;
    food: FoodEntity;
  };
}
