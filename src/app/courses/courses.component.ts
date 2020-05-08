import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ICourse } from './shared/course.model';
import { FilterByTitlePipe } from './filter-by-title.pipe';
import { CoursesService } from './courses.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.coursesService.getList().then((data) => (this.courses = data));
  }

  public handleSearch(searchValue): void {
    this.courses = this.filterByTitle.transform(this.courses, searchValue);
  }

  public handleDelete(id): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Do you really want to delete this course?',
        confirm: id,
      },
    });

    dialogRef.afterClosed().subscribe((res) => this.deleteCourse(res));
  }

  private deleteCourse(id): void {
    this.coursesService.removeItem(id).then((deletedId) => {
      this.courses = this.courses.filter(
        (item: ICourse) => item.id !== deletedId
      );
    });
  }
}
