import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyNumber',
})
export class PrettyNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) {
      return '';
    }

    // Форматируем число с пробелами
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
