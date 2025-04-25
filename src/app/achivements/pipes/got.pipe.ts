import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'achived',
})
export class GotPipe implements PipeTransform {
  transform(value: any[]): number {
    return value.reduce((total, item) => (total += item.achived), 0);
  }
}
