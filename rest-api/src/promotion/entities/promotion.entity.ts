import { ApiProperty } from '@nestjs/swagger';
import { Promotions } from '@prisma/client';

export class PromotionEntity implements Promotions {
  @ApiProperty()
  id: number;

  @ApiProperty()
  promotionName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  discountValue: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
