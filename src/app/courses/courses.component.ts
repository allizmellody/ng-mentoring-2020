import { Component, OnInit } from '@angular/core';

import { ICourse } from './shared/course.model';
import { FilterByTitlePipe } from './filter-by-title.pipe';
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
    private filterByTitle: FilterByTitlePipe,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.coursesService.getList().then((data) => (this.courses = data));
  }

  public handleSearch(searchValue): void {
    this.courses = this.filterByTitle.transform(this.courses, searchValue);
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
    if (id) {
      this.coursesService.removeItem(id).then((deletedId) => {
        this.courses = this.courses.filter(
          (item: ICourse) => item.id !== deletedId
        );
      });
    }
  }
}
