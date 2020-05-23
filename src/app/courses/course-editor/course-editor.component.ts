import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subscriber } from 'rxjs';

import { ICourse } from '../shared/course.model';
import { CHANGE_DETECTOR } from '../../shared/can-deactivate.guard';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';
import { CoursesService } from '../courses.service';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    @Inject(CHANGE_DETECTOR) private coursesService: CoursesService
  ) {}
  public title: string;
  public courseForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: [null],
    creationDate: [null],
    authors: [[], Validators.required],
  });

  private searchData = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
  ];

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
      { ...data, creationDate: data.creationDate },
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

  public isFieldInvalid(fieldName: string): boolean {
    const field = this.courseForm.get(fieldName);

    return field.touched && field.invalid;
  }

  public onSubmit(data): void {
    if (this.courseForm.valid) {
      this.coursesService.checkChanges = false;
      this.postItem(data)
        .pipe(untilDestroyed(this))
        .subscribe(() => this.router.navigate(['/courses']));
    }
  }

  getData = (query: string) => this.search(query);

  // The dataMapping property controls the mapping of an object returned via getData.
  // to a string that can be displayed to the use as an option to select.
  dataMapping = (obj: any) => obj;

  // This function is called any time a change is made in the autocomplete.
  // When the text is changed manually, no object is passed.
  // When a selection is made the object is passed.
  change(obj: any): void {
    if (obj) {
      // You can do pretty much anything here as the entire object is passed if it's been selected.
      // Navigate to another page, update a model etc.
      alert(obj);
    }
  }

  // This function mimics an Observable http service call.
  // In reality it's probably calling your API, but today it's looking at mock static data.
  private search(query: string): Observable<any> {
    return new Observable<any>((subscriber: Subscriber<any>) =>
      subscriber.next()
    ).pipe(map((o) => this.searchData.filter((d) => d.indexOf(query) > -1)));
  }
}
