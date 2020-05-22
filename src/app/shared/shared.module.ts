import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogComponent } from './dialog/dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { DateInputComponent } from './date-input/date-input.component';
import { NumberInputComponent } from './number-input/number-input.component';

@NgModule({
  declarations: [
    DialogComponent,
    LoaderComponent,
    DateInputComponent,
    NumberInputComponent,
  ],
  imports: [
    CommonModule,
    A11yModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [LoaderComponent, DateInputComponent, NumberInputComponent],
})
export class SharedModule {}
