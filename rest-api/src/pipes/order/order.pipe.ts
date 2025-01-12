import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OrderPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== 'asc' && value !== 'desc' && value !== undefined) {
      throw new BadRequestException("The value must be 'asc' or 'desc'!");
    }

    return value;
  }
}
