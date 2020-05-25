import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourse } from '../shared/course.model';
import { CHANGE_DETECTOR } from '../../shared/can-deactivate.guard';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';
import { CoursesService } from '../courses.service';
import { AuthorsService } from '../authors.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { IAuthor } from '../shared/author.model';

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
    private authorsService: AuthorsService,
    private loaderService: LoaderService,
    @Inject(CHANGE_DETECTOR) private coursesService: CoursesService
  ) {}
  public title: string;
  public courseForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: [null],
    creationDate: [null],
    authors: [[]],
  });

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
    this.courseForm.patchValue(data, { emitEvent: false });
    this.coursesService.checkChanges = false;
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

  private get authors(): AbstractControl {
    return this.courseForm.get('authors');
  }

  private updateAuthors(value: IAuthor[]): void {
    if (!this.authors.touched) {
      this.authors.markAsTouched();
    }
    this.courseForm.patchValue({ authors: value });
  }

  public addAuthor(value: IAuthor): void {
    const updatedAuthors = [...this.authors.value, value];
    this.updateAuthors(updatedAuthors);
  }

  public removeAuthor(idx: number): void {
    const authors = this.authors.value;

    if (authors[idx]) {
      authors.splice(idx, 1);
      this.updateAuthors(authors);
    }
  }

  private getAuthors(query: string): Observable<IAuthor[]> {
    this.loaderService.prevented = true;
    return this.authorsService.searchByWord(query).pipe(
      map((v) => {
        return v.filter(({ id }: IAuthor) => {
          return !this.authors.value.some(
            ({ id: selectedId }: IAuthor) => selectedId === id
          );
        });
      })
    );
  }

  public searchAuthors = (query: string): Observable<IAuthor[]> =>
    this.getAuthors(query);

  public dataMapping(obj: IAuthor): string {
    return obj.name;
  }

  public isFieldInvalid(fieldName: string, error?: string): boolean {
    const field = this.courseForm.get(fieldName);
    const invalid = error ? field.errors?.[error] : field.invalid;

    return field.touched && invalid;
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
