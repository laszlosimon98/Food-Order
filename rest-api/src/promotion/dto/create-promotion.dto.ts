import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
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

  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsDateString()
  @ApiProperty()
  endDate: Date;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
