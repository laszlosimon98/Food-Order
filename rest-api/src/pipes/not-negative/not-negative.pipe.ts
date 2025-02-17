import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NotNegativePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value < 0 && value !== undefined) {
      throw new BadRequestException('Not negative number expected!');
    }
    return value;
  }
}
