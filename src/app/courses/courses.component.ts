import { Component, OnInit } from '@angular/core';

import { ICourse } from './shared/course.model';
import { CoursesService } from './courses.service';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses: ICourse[] = [];

  constructor(
    private coursesService: CoursesService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.coursesService
      .getList()
      .subscribe((courses: ICourse[]) => (this.courses = courses));
  }

  public handleSearch(searchValue): void {
    this.coursesService
      .searchByWord(searchValue)
      .subscribe((courses: ICourse[]) => {
        this.courses = courses;
      });
  }

  public handleDelete(id): void {
    this.dialogService
      .open({
        text: 'Do you really want to delete this course?',
        confirm: id,
      })
      .subscribe((res) => this.deleteCourse(res));
  }

  private deleteCourse(id): void {
    this.coursesService.removeCourse(id).subscribe(() => {
      this.courses = this.courses.filter((item: ICourse) => item.id !== id);
    });
  }
}
