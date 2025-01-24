import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';

export class CategoryEntity implements Categories {
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  categoryName: string;

  createdAt: Date;
  updatedAt: Date;
}
