import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateFavoriteFoodDto {
  @IsNumber()
  @ApiProperty()
  foodId: number;
}
