import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, args: any): any {
    const regex = new RegExp(args, 'gi');

    return value.replace(regex, (match) => '<strong>' + match + '</strong>');
  }
}
