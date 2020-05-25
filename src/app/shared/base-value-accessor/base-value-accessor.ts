import { AfterViewInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

export class BaseValueAccessor
  implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() formControlName: string;
  @ViewChild(DefaultValueAccessor) valueAccessor: DefaultValueAccessor;

  protected delegatedMethodCalls = new ReplaySubject<
    (_: ControlValueAccessor) => void
  >();

  ngAfterViewInit(): void {
    this.delegatedMethodCalls.subscribe((fn) => fn(this.valueAccessor));
  }

  ngOnDestroy() {
    this.delegatedMethodCalls.unsubscribe();
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
