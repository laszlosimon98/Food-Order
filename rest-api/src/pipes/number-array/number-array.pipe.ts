import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NumberArrayPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isAllNumber = value.some((val) => !Number.isNaN(Number(val)));
    if (!isAllNumber) {
      throw new BadRequestException('Number array expected!');
    }

    return value.map((val) => parseInt(val));
  }
}
