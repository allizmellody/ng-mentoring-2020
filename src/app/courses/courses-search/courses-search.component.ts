import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent implements OnInit {
  public keyUp = new Subject<KeyboardEvent>();
  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.keyUp
      .pipe(
        map((event: any) => event.target.value),
        filter((value: string) => !value || value.length >= 3),
        debounceTime(300),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe((value: string) => this.search.emit(value));
  }
}
