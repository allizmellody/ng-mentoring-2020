import { Component, OnInit } from '@angular/core';

import { ICourse } from '../shared/course.model';
import data from './data.json';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  public courses: ICourse[];

  constructor() {}

  ngOnInit(): void {
    this.courses = data;
  }

  public handleDelete(id) {
    console.log(id);
  }
}
