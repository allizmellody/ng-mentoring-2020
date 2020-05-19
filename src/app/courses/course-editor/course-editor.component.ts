import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import moment from 'moment';

import { ICourse } from '../shared/course.model';
import { CHANGE_DETECTOR } from '../../shared/can-deactivate.guard';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';
import { CoursesService } from '../courses.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return Boolean(control && control.invalid && isSubmitted);
  }
}

@UntilDestroy()
@Component({
  selector: 'course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit {
  public title: string;
  public matcher = new MyErrorStateMatcher();
  public courseForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    duration: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    creationDate: ['', Validators.required],
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
    this.subscribeFormChanges();

    if (id) {
      this.coursesService
        .getItemById(id)
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          this.title = data.title;
          this.updateForm(data);
          this.changeBreadcrumbDisplayName(data.title);
        });
    }
  }

  private updateForm(data: ICourse): void {
    this.courseForm.patchValue(
      { ...data, creationDate: moment(data.creationDate) },
      { emitEvent: false }
    );
  }

  private subscribeFormChanges(): void {
    this.courseForm.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.coursesService.checkChanges = true;
    });
  }

  private changeBreadcrumbDisplayName(title: string): void {
    this.breadcrumbService.changeBreadcrumb(this.route.snapshot, title);
  }

  private postItem(data: ICourse): Observable<ICourse> {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      return this.coursesService.updateCourse(id, data);
    }
    return this.coursesService.createCourse(data);
  }

  public isFieldValid(path: string): boolean {
    return this.courseForm.get(path).hasError('required');
  }

  public onSubmit(data): void {
    if (this.courseForm.valid) {
      this.coursesService.checkChanges = false;
      this.postItem(data)
        .pipe(untilDestroyed(this))
        .subscribe(() => this.router.navigate(['/courses']));
    }
  }
}
