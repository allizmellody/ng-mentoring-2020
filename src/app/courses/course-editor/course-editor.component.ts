import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import moment from 'moment';

import { ICourse } from '../shared/course.model';
import { CHANGE_DETECTOR } from '../../shared/can-deactivate.guard';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit {
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
    @Inject(CHANGE_DETECTOR) private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.getCourseData(id).then(() => this.onChanges());
  }

  private onChanges(): void {
    this.courseForm.valueChanges.subscribe(() => {
      this.coursesService.checkChanges = true;
    });
  }

  private getCourseData(id: string): Promise<void> {
    if (!id) {
      return Promise.resolve();
    }

    return this.coursesService.getItemById(id).then((data) => {
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
      this.coursesService.checkChanges = false;
      this.postItem(data).then(() => this.router.navigate(['/courses']));
    }
  }
}
