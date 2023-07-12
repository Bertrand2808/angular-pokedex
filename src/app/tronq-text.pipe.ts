import { Pipe, PipeTransform } from '@angular/core';
/*
* Pipe to tronq text by limit of characters that are displayed
*/
@Pipe({
  name: 'tronqText'
})
export class TronqTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    }
    return value;
  }
}
