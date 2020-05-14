import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { CoursesService } from './courses/courses.service';
import { CHANGE_DETECTOR } from './shared/can-deactivate.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AuthModule,
  ],
  providers: [{ provide: CHANGE_DETECTOR, useClass: CoursesService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
