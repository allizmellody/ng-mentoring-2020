import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from '../shared/course.model';

@Component({
  selector: 'agmp-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() item: ICourse;

  constructor() { }

  ngOnInit(): void {
  }

}
