import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { ICourse } from './shared/course.model';
import { CoursesService } from './courses.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { LoaderService } from '../shared/loader/loader.service';
import { ICoursesResponse } from './shared/courses-response.model';

@UntilDestroy()
@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public isLoading: boolean;
  public courses: ICourse[] = [];
  private page = 1;
  private count: number;

  constructor(
    private coursesService: CoursesService,
    private dialogService: DialogService,
    private loaderService: LoaderService
  ) {
    loaderService.isLoading
      .pipe(untilDestroyed(this))
      .subscribe((value: boolean) => (this.isLoading = value));
  }

  public get showLoadMore() {
    return this.courses.length && this.courses.length < this.count;
  }

  ngOnInit(): void {
    this.coursesService
      .getPage(this.page)
      .pipe(untilDestroyed(this))
      .subscribe(({ data, count }: ICoursesResponse) => {
        this.courses = data;
        this.count = count;
      });
  }

  public handleSearch(searchValue): void {
    this.coursesService
      .searchByWord(searchValue, this.page)
      .pipe(untilDestroyed(this))
      .subscribe(({ data, count }: ICoursesResponse) => {
        this.courses = data;
        this.count = count;
      });
  }

  public loadMore(): void {
    this.page += 1;
    this.coursesService
      .getPage(this.page)
      .pipe(untilDestroyed(this))
      .subscribe(({ data, count }: ICoursesResponse) => {
        this.courses = [...this.courses, ...data];
        this.count = count;
      });
  }

  public handleDelete(id): void {
    this.dialogService
      .open({
        text: 'Do you really want to delete this course?',
        confirm: id,
      })
      .pipe(
        untilDestroyed(this),
        filter((confirm) => confirm)
      )
      .subscribe((res) => this.deleteCourse(res));
  }

  private deleteCourse(id): void {
    this.coursesService
      .removeCourse(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.count -= 1;
        this.courses = this.courses.filter((item: ICourse) => item.id !== id);
      });
  }
}
