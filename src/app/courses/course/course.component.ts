import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ICourse } from '../shared/course.model';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() ngClass: string | string[] | Set<string> | { [klass: string]: any; };
  @Input() item: ICourse;
  @Output() delete = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public handleEditClick(): void {
    console.log('Edit');
  }

  public handleDeleteClick(): void {
    this.delete.emit(this.item.id);
  }
}
