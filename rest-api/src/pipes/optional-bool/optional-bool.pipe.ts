import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalBoolPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== undefined && value !== 'true' && value !== 'false') {
      throw new BadRequestException('Boolean value expected');
    }

    return value === 'true' ? true : value === 'false' ? false : undefined;
  }
}
