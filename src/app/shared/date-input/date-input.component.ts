import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import moment from 'moment';
import { BaseValueAccessor } from '../base-value-accessor/base-value-accessor';

const DATE_REGEX = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

@Component({
  selector: 'agmp-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !DATE_REGEX.test(control.value);
        return forbidden ? { invalidDate: { value: control.value } } : null;
      },
      multi: true,
    },
  ],
})
export class DateInputComponent extends BaseValueAccessor {
  constructor() {
    super();
  }

  writeValue(value: any): void {
    this.delegatedMethodCalls.next((valueAccessor) =>
      valueAccessor.writeValue(moment(value).format('YYYY-MM-DD'))
    );
  }
}
