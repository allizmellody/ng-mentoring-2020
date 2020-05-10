import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './auth/login-page/login-page.component';
import { NoMatchPageComponent } from './core/no-match-page/no-match-page.component';
import { AuthGuard } from './auth/auth.guard';
import { CoursesModule } from './courses/courses.module';

const routes: Routes = [
  { path: 'auth', component: LoginPageComponent },
  {
    path: 'courses',
    loadChildren: () => CoursesModule,
    canLoad: [AuthGuard],
    data: { breadcrumb: 'Courses' },
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: NoMatchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
