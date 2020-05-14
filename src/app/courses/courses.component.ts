import { Component, OnInit } from '@angular/core';

import { ICourse } from './shared/course.model';
import { CoursesService } from './courses.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public isLoading: boolean;
  public courses: ICourse[] = [];
  public page = 1;

  constructor(
    private coursesService: CoursesService,
    private dialogService: DialogService,
    private loaderService: LoaderService
  ) {
    loaderService.isLoading.subscribe(
      (value: boolean) => (this.isLoading = value)
    );
  }

  ngOnInit(): void {
    this.coursesService
      .getPage(this.page)
      .subscribe((courses: ICourse[]) => (this.courses = courses));
  }

  public handleSearch(searchValue): void {
    this.coursesService
      .searchByWord(searchValue, this.page)
      .subscribe((courses: ICourse[]) => {
        this.courses = courses;
      });
  }

  public loadMore(): void {
    this.page += 1;
    this.coursesService.getPage(this.page).subscribe((data) => {
      this.courses = [...this.courses, ...data];
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
