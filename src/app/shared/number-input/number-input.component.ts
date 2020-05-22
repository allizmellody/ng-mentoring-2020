import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  DefaultValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ReplaySubject } from 'rxjs';

const NUMBER_REGEX = /^[0-9]+$/;

@Component({
  selector: 'agmp-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !NUMBER_REGEX.test(control.value);
        return forbidden ? { invalidNumber: { value: control.value } } : null;
      },
      multi: true,
    },
  ],
})
export class NumberInputComponent
  implements ControlValueAccessor, AfterViewInit {
  @Input() formControlName: string;
  @ViewChild(DefaultValueAccessor) valueAccessor: DefaultValueAccessor;

  private delegatedMethodCalls = new ReplaySubject<
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
