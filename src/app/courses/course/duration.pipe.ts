import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): any {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const hoursDisplay = hours ? `${hours}h ` : '';
    const minutesDisplay = minutes ? `${minutes}min` : '';

    return hoursDisplay + minutesDisplay;
  }

}
