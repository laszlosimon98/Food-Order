import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PositivePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value <= 0 && value !== undefined) {
      throw new BadRequestException('Positive number expected!');
    }
    return value;
  }
}
