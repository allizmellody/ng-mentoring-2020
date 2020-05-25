import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AutoCompleteRefDirective } from './autocomplete.directive';
import { BaseValueAccessor } from '../base-value-accessor/base-value-accessor';

@UntilDestroy()
@Component({
  selector: 'agmp-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !control.value || !control.value.length;
        return forbidden ? { emptyArray: { value: control.value } } : null;
      },
      multi: true,
    },
  ],
})
export class TagInputComponent extends BaseValueAccessor
  implements AfterViewInit {
  @ViewChild(AutoCompleteRefDirective) input: AutoCompleteRefDirective;
  @ViewChildren('element') elements: QueryList<ElementRef>;
  @ViewChild('inputRef') inputRef: ElementRef;
  @Input() dataMapping: (obj: any) => string;
  @Input() search: (query: string) => Observable<any>;
  @Input() placeholder: string;
  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();

  public value: any[];
  public results: any[] = [];
  public query: string;
  public selectedIndex = 0;

  writeValue(value: any): void {
    this.value = value;
    this.delegatedMethodCalls.next((valueAccessor) =>
      valueAccessor.writeValue(value)
    );
  }

  @HostListener('document:click', ['$event'])
  clickedOutside(): void {
    this.clearResults();
  }

  ngAfterViewInit(): void {
    this.input.change
      .pipe(debounceTime(500), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((query: string) => {
        this.query = query;

        if (query) {
          this.search(query)
            .pipe(untilDestroyed(this))
            .subscribe((data) => {
              this.results = data;
              this.input.hasResults = data.length > 0;
              this.selectedIndex = 0;
            });
        } else {
          this.clearResults();
        }
      });

    this.input.cancel.pipe(untilDestroyed(this)).subscribe(() => {
      this.clearResults();
    });

    this.input.select.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.results.length) {
        this.selectResult(this.results[this.selectedIndex]);
      }
    });

    this.input.up.pipe(untilDestroyed(this)).subscribe(() => {
      const elements = this.elements.toArray();
      if (elements && this.selectedIndex > 0) {
        this.selectedIndex--;
        elements[this.selectedIndex].nativeElement.scrollIntoView();
      }
    });

    this.input.down.pipe(untilDestroyed(this)).subscribe(() => {
      const elements = this.elements.toArray();
      if (elements && this.selectedIndex + 1 < elements.length) {
        this.selectedIndex++;
        elements[this.selectedIndex].nativeElement.scrollIntoView();
      }
    });
  }

  private clearResults(): void {
    this.results = [];
    this.selectedIndex = 0;
    this.input.hasResults = false;
  }

  public selectResult(result: any): void {
    this.add.emit(result);
    this.clearResults();
  }

  public onDelete(idx: number): void {
    this.remove.emit(idx);
  }

  public focus(): void {
    this.inputRef.nativeElement.focus();
  }

  public clickedInside($event: any): void {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
