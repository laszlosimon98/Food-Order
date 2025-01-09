import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @ApiProperty()
  newPassword: string;
}
