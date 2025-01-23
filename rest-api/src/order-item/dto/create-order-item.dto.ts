import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  foodId: number;
}
