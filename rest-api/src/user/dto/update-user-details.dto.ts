import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;
}
