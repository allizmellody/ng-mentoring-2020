import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseEditorComponent } from './course-editor/course-editor.component';
import { CanDeactivateGuard } from '../shared/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: { breadcrumb: null },
  },
  {
    path: 'new',
    component: CourseEditorComponent,
    data: { breadcrumb: 'New course' },
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: ':id',
    component: CourseEditorComponent,
    data: { breadcrumb: 'course' },
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
