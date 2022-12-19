import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OrderValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    for (const [objKey, objValue] of Object.entries(value)) {
      if (objValue === 'undefined') {
        delete value[objKey];
      }
    }
    return value;
  }
}
