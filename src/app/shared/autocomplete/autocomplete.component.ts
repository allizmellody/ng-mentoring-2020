import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ContentChild,
  AfterContentInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AutoCompleteRefDirective } from './autocomplete.directive';

@UntilDestroy()
@Component({
  selector: 'agmp-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutoCompleteComponent implements AfterContentInit {
  @ContentChild(AutoCompleteRefDirective) input: AutoCompleteRefDirective;
  @Input() dataMapping: (obj: any) => string;
  @Input() search: (query: string) => Observable<any>;
  @Output() change = new EventEmitter<any>();

  public results: any[];
  public query: string;
  public selectedIndex = 0;
  private searchCounter = 0;

  @HostListener('document:click', ['$event'])
  clickedOutside(): void {
    this.clearResults();
  }

  ngAfterContentInit(): void {
    this.input.change
      .pipe(
        filter((value: string) => !value || value.length >= 3),
        debounceTime(300),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe((query: string) => {
        this.query = query;
        this.change.emit();
        this.searchCounter++;
        const counter = this.searchCounter;

        if (query) {
          this.search(query)
            .pipe(untilDestroyed(this))
            .subscribe((data) => {
              if (counter === this.searchCounter) {
                this.results = data;
                this.input.hasResults = data.length > 0;
                this.selectedIndex = 0;
              }
            });
        } else {
          this.clearResults();
        }
      });

    this.input.cancel.pipe(untilDestroyed(this)).subscribe(() => {
      this.clearResults();
    });

    this.input.select.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.results && this.results.length > 0) {
        this.selectResult(this.results[this.selectedIndex]);
      }
    });

    this.input.up.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.results && this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    });

    this.input.down.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.results && this.selectedIndex + 1 < this.results.length) {
        this.selectedIndex++;
      }
    });
  }

  private clearResults(): void {
    this.results = [];
    this.selectedIndex = 0;
    this.searchCounter = 0;
    this.input.hasResults = false;
  }

  public selectResult(result: any): void {
    this.change.emit(result);
    this.clearResults();
  }

  public clickedInside($event: any): void {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
