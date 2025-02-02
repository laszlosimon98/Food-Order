import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({ default: 1 })
  rating: number;

  @IsString()
  @ApiProperty({ default: 'Értékelés Leírása' })
  reviewText: string;

  @IsNumber()
  @ApiProperty()
  foodId: number;
}
