import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UserEntity implements Users {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  fullname: string;

  username: string;
  password: string;

  @ApiProperty()
  role: string;

  refreshToken: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
