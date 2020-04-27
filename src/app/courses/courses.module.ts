import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesSearchComponent } from './courses-search/courses-search.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseComponent,
    CoursesSearchComponent,
  ],
  exports: [CoursesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
})
export class CoursesModule {}
