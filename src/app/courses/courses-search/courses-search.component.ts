import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent implements OnInit {
  public searchValue: string;

  constructor() {}

  ngOnInit(): void {}

  public handleSearch() {
    console.log(this.searchValue);
  }
}
