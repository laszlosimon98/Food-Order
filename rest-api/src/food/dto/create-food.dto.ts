import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  isSpice: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  @ApiProperty()
  isVegetarian: boolean;

  // @ApiProperty()
  // orderItemId: number;

  @IsNumber()
  @ApiProperty()
  categoryId: number;
}
