import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(Number(value)) && value !== undefined) {
      throw new BadRequestException('Number expected!');
    }

    return parseInt(value);
  }
}
