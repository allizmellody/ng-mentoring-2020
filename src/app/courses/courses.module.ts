import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesSearchComponent } from './courses-search/courses-search.component';
import { CourseEditorComponent } from './course-editor/course-editor.component';
import { StatusShadowDirective } from './course/status-shadow.directive';
import { DurationPipe } from './course/duration.pipe';
import { OrderByPipe } from './order-by.pipe';
import { FilterByTitlePipe } from './filter-by-title.pipe';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CoursesSearchComponent,
    StatusShadowDirective,
    DurationPipe,
    OrderByPipe,
    FilterByTitlePipe,
    CourseEditorComponent,
  ],
  providers: [FilterByTitlePipe],
  exports: [CoursesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CoursesRoutingModule,
  ],
})
export class CoursesModule {}
