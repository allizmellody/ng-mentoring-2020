import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import moment from 'moment';

import { ICourse } from '../shared/course.model';
import { CanComponentDeactivate } from '../../shared/can-deactivate.guard';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent extends CanComponentDeactivate
  implements OnInit {
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
    private coursesService: CoursesService
  ) {
    super();
  }

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

  public canDeactivate(): boolean {
    return !this.courseForm.dirty && !this.isSubmitted;
  }
}
