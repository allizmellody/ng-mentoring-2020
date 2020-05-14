import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ICourse } from '../shared/course.model';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() item: ICourse;
  @Output() delete = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public handleDeleteClick(): void {
    this.delete.emit(this.item.id);
  }
}
