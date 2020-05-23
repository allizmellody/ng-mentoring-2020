import {
  Directive,
  Input,
  Output,
  HostListener,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[autocompleteRef]',
})
export class AutosuggestInputDirective {
  @Input() hasResults = false;
  @Output() change = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() up = new EventEmitter();
  @Output() down = new EventEmitter();

  @HostListener('input', ['$event'])
  oninput(event: any) {
    this.change.emit(event.target.value);
  }

  @HostListener('keydown', ['$event'])
  onkeydown(event: any) {
    switch (event.code) {
      case 27:
        this.cancel.emit();
        return false;
      case 13:
        this.select.emit();
        return !this.hasResults;
      case 38:
        this.up.emit();
        return false;
      case 40:
        this.down.emit();
        return false;
      default:
    }
  }
}
