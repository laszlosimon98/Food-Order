import { OmitType, PartialType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class LoginDto extends PartialType(
  OmitType(RegisterDto, ['fullname'] as const),
) {}
