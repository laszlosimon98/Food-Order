import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phoneNumber: string;
}
