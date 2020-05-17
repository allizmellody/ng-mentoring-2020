import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { CoursesService } from './courses/courses.service';
import { CHANGE_DETECTOR } from './shared/can-deactivate.guard';
import { SharedModule } from './shared/shared.module';
import { LoaderInterceptor } from './shared/loader/loader.interceptor';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';

export function initApp(authService: AuthService) {
  return () => authService.auth();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AuthModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthService],
      multi: true,
    },
    { provide: CHANGE_DETECTOR, useClass: CoursesService },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
