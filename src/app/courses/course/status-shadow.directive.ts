import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import moment from 'moment';

@Directive({
  selector: '[agmpStatusShadow]',
})
export class StatusShadowDirective implements OnInit {
  @Input('agmpStatusShadow') date: string;

  private blue = '48,182,221';
  private green = '155,200,55';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const shadow = this.getShadow();

    if (shadow) {
      this.el.nativeElement.style.boxShadow = shadow;
    }
  }

  private getShadow(): string {
    const currentDate = moment();
    const creationDate = moment(this.date);
    const freshCourse = creationDate < currentDate && creationDate >= moment(currentDate).subtract(14, 'days');
    const upcomingCourse = creationDate > currentDate;

    if (freshCourse) {
      return this.getShadowStyle(this.green);
    } else if (upcomingCourse) {
      return this.getShadowStyle(this.blue);
    }
  }

  private getShadowStyle(rgb: string): string {
    return `0px 2px 1px -1px rgba(${rgb}, .5), 0px 1px 1px 0px rgba(${rgb}, .5), 0px 1px 3px 0px rgba(${rgb}, 0.5)`;
  }
}
