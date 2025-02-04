import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsString()
  @ApiProperty()
  fullname: string;

  @IsOptional()
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiProperty()
  phoneNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ApiProperty({ type: CreateOrderItemDto, isArray: true })
  orderItems: CreateOrderItemDto[];
}
