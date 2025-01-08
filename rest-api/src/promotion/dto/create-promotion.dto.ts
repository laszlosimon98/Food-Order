import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @ApiProperty()
  promotionName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  discountValue: number;

  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @ApiProperty()
  endDate: Date;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
