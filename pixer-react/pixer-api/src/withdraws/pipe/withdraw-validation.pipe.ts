import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class WithdrawValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    for (const [objKey, objValue] of Object.entries(value)) {
      if (objValue === 'undefined') {
        delete value[objKey];
      }
    }
    return value;
  }
}
