import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, args: any): any {
    const re = new RegExp(args, 'gi');

    return value.replace(re, (match) => '<strong>' + match + '</strong>');
  }
}
