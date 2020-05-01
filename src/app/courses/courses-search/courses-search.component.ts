import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  public searchValue: string;

  constructor() {}

  ngOnInit(): void {}

  public handleSearch() {
    this.search.emit(this.searchValue);
  }

  public handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
}
