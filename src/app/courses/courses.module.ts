import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CourseComponent],
  exports: [CoursesComponent],
  imports: [CommonModule, FlexLayoutModule, MatCardModule],
})
export class CoursesModule {}
