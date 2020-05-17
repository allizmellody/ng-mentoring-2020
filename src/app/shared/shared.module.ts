import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DialogComponent } from './dialog/dialog.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [DialogComponent, LoaderComponent],
  imports: [
    CommonModule,
    A11yModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  exports: [LoaderComponent],
})
export class SharedModule {}
