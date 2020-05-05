import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'auth', component: LoginPageComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
