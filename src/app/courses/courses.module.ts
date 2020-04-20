import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [ CoursesComponent, CoursesListComponent, CourseComponent ],
  exports: [ CoursesListComponent ],
  imports: [ CommonModule ]
})
export class CoursesModule { }
