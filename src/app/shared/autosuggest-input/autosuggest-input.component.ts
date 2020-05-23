import {
  Component,
  Input,
  Output,
  OnInit,
  ContentChild,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { AutosuggestInputDirective } from './autosuggest-input.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'agmp-autosuggest-input',
  template: `
    <ng-content></ng-content>
    <div class="autocomplete-wrapper" (click)="clickedInside($event)">
      <div class="list-group autocomplete" *ngIf="results">
        <a
          [routerLink]=""
          class="list-group-item"
          (click)="selectResult(result)"
          *ngFor="let result of results; let i = index"
          [innerHTML]="dataMapping(result) | highlight: query"
          [ngClass]="{ active: i == selectedIndex }"
        ></a>
      </div>
    </div>
  `,
  styleUrls: ['./autosuggest-input.component.scss'],
})
export class AutosuggestInputComponent implements OnInit {
  @ContentChild(AutosuggestInputDirective)
  public input: AutosuggestInputDirective;

  @Input() data: (searchTerm: string) => Observable<any[]>;
  @Input() dataMapping: (obj: any) => string;
  @Output() change = new EventEmitter<any>();

  public results: any[];
  public query: string;
  public selectedIndex = 0;
  private searchCounter = 0;

  @HostListener('document:click', ['$event'])
  clickedOutside($event: any): void {
    this.clearResults();
  }

  ngOnInit(): void {
    this.input.change.subscribe((query: string) => {
      this.query = query;
      this.change.emit();
      this.searchCounter++;
      const counter = this.searchCounter;

      if (query) {
        this.data(query).subscribe((data) => {
          console.log(data);
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

    this.input.cancel.subscribe(() => {
      this.clearResults();
    });

    this.input.select.subscribe(() => {
      if (this.results && this.results.length > 0) {
        this.selectResult(this.results[this.selectedIndex]);
      }
    });

    this.input.up.subscribe(() => {
      if (this.results && this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    });

    this.input.down.subscribe(() => {
      if (this.results && this.selectedIndex + 1 < this.results.length) {
        this.selectedIndex++;
      }
    });
  }

  selectResult(result: any): void {
    this.change.emit(result);
    this.clearResults();
  }

  clickedInside($event: any): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  private clearResults(): void {
    this.results = [];
    this.selectedIndex = 0;
    this.searchCounter = 0;
    this.input.hasResults = false;
  }
}
