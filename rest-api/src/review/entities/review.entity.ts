import { ApiProperty } from '@nestjs/swagger';
import { Reviews } from '@prisma/client';

export class ReviewEntity implements Reviews {
  @ApiProperty()
  reviewId: number;

  @ApiProperty({ default: 1 })
  rating: number;

  @ApiProperty({ default: 'Értékelés leírása' })
  reviewText: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  isEditable: boolean;

  @ApiProperty()
  foodId: number;

  createdAt: Date;
  updatedAt: Date;
}
