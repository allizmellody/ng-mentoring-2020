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
import moment from 'moment';

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
export class DateInputComponent implements ControlValueAccessor, AfterViewInit {
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
      valueAccessor.writeValue(moment(value).format('YYYY-MM-DD'))
    );
  }
}
