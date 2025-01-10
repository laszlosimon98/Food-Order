import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';

export class UpdateOrderItemDto extends PartialType(
  OmitType(CreateOrderItemDto, ['foodId'] as const),
) {}
