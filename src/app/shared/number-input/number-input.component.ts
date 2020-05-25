import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BaseValueAccessor } from '../base-value-accessor/base-value-accessor';

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
export class NumberInputComponent extends BaseValueAccessor {
  constructor() {
    super();
  }
}
