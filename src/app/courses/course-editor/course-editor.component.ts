import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import moment from 'moment';

import { ICourse } from '../shared/course.model';
import { CoursesService } from '../courses.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit, CanDeactivate<boolean> {
  private isSubmitted = false;
  public title: string;
  public courseForm = this.fb.group({
    id: [],
    title: [''],
    description: [''],
    duration: [null],
    creationDate: [''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private coursesService: CoursesService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getCourseData(id);
    }
  }

  private getCourseData(id: string): void {
    this.coursesService.getItemById(id).then((data) => {
      this.title = data.title;
      this.courseForm.patchValue({
        ...data,
        creationDate: moment(data.creationDate),
      });
      this.changeBreadcrumbDisplayName();
    });
  }

  private changeBreadcrumbDisplayName(): void {
    this.breadcrumbService.changeBreadcrumb(
      this.route.snapshot,
      this.courseForm.value.title
    );
  }

  private postItem(data: ICourse): Promise<ICourse> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      return this.coursesService.updateItem(data);
    }
    return this.coursesService.createCourse(data);
  }

  public onSubmit(data): void {
    if (this.courseForm.touched) {
      this.isSubmitted = true;
      this.postItem(data).then(() => this.router.navigate(['/courses']));
    }
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (!this.courseForm.touched || this.isSubmitted) {
      return true;
    }

    return this.dialogService
      .open({
        text:
          'You have unsaved changes. By leaving the page you will lost all the data. Discard changes?',
        confirm: 'confirm',
      })
      .pipe(map((result) => result === 'confirm'));
  }
}
