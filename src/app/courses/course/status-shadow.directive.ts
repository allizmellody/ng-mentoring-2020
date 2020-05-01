import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[agmpStatusShadow]',
})
export class StatusShadowDirective {
  @Input('agmpStatusShadow') date: string;

  private blue = '48,182,221';
  private green = '155,200,55';
  private black = '0,0,0';
  private currentDate = new Date();
  private creationDate = new Date(this.date);

  constructor() {}

  @HostBinding('style.box-shadow')
  boxShadow = this.getShadow();

  private getShadow(): string {
    console.log(this.creationDate < this.currentDate);
    console.log(this.creationDate >= new Date(this.currentDate.getDate() - 14));
    console.log(
      console.log(this.date, this.creationDate, this.currentDate),
      new Date(this.currentDate.getDate() - 14)
    );
    if (
      this.creationDate < this.currentDate &&
      this.creationDate >= new Date(this.currentDate.getDate() - 14)
    ) {
      return this.getShadowStyle(this.green);
    } else if (this.creationDate > this.currentDate) {
      return this.getShadowStyle(this.blue);
    }
    return this.getShadowStyle(this.black);
  }

  private getShadowStyle(rgb: string): string {
    return `0px 4px 4px -1px rgba(${rgb}, 0.2), 0px 2px 1px 0px rgba(${rgb}, 0.14), 0px 2px 4px 0px rgba(${rgb}, 0.12)`;
  }
}
