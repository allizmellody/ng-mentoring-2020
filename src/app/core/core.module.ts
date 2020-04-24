import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [ HeaderComponent, BreadcrumbsComponent, FooterComponent, LogoComponent ],
  exports: [ HeaderComponent, BreadcrumbsComponent, FooterComponent ],
  imports: [ CommonModule, MatToolbarModule, MatIconModule ]
})
export class CoreModule { }
