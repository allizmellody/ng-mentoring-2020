import { AfterViewInit, Directive, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Directive({
  selector: 'base-value-accessor',
})
export class BaseValueAccessorDirective
  implements ControlValueAccessor, AfterViewInit {
  @Input() formControlName: string;
  @ViewChild(DefaultValueAccessor) valueAccessor: DefaultValueAccessor;

  protected delegatedMethodCalls = new ReplaySubject<
    (_: ControlValueAccessor) => void
  >();

  ngAfterViewInit(): void {
    this.delegatedMethodCalls.subscribe((fn) => fn(this.valueAccessor));
  }

  registerOnChange(fn: (_: any) => void): void {
    this.delegatedMethodCalls.next((valueAccessor) =>
      valueAccessor.registerOnChange(fn)
    );
  }
  registerOnTouched(fn: () => void): void {
    this.delegatedMethodCalls.next((valueAccessor) =>
      valueAccessor.registerOnTouched(fn)
    );
  }

  setDisabledState(isDisabled: boolean): void {
    this.delegatedMethodCalls.next((valueAccessor) =>
      valueAccessor.setDisabledState(isDisabled)
    );
  }

  writeValue(value: any): void {
    this.delegatedMethodCalls.next((valueAccessor) =>
      valueAccessor.writeValue(value)
    );
  }
}
