import { Component, OnInit } from '@angular/core';

import { ICourse } from './shared/course.model';
import { FilterByTitlePipe } from './filter-by-title.pipe';
import data from './data.json';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses: ICourse[] = [];

  constructor(private filterByTitle: FilterByTitlePipe) {}

  ngOnInit(): void {
    this.courses = data;
  }

  public handleSearch(searchValue): void {
    this.courses = this.filterByTitle.transform(data, searchValue);
  }

  public handleDelete(id) {
    console.log(id);
  }
}
