import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {

  transform(list: any[], substring: string): any {
    if (!substring) {
      return list;
    }

    return list.filter(course => course.title.toLowerCase().includes(substring));
  }

}
