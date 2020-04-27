import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeaderComponent, BreadcrumbsComponent, FooterComponent],
  exports: [HeaderComponent, BreadcrumbsComponent, FooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class CoreModule {}
