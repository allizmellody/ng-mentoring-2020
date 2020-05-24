import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DialogComponent } from './dialog/dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { DateInputComponent } from './date-input/date-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { AutoCompleteRefDirective } from './tag-input/autocomplete.directive';
import { HighlightPipe } from './tag-input/highlight.pipe';
import { TagInputComponent } from './tag-input/tag-input.component';
import { MatIconModule } from '@angular/material/icon';
import { BaseValueAccessorDirective } from './base-value-accessor/base-value-accessor.directive';

@NgModule({
  declarations: [
    DialogComponent,
    LoaderComponent,
    DateInputComponent,
    NumberInputComponent,
    HighlightPipe,
    TagInputComponent,
    AutoCompleteRefDirective,
    BaseValueAccessorDirective,
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
    RouterModule,
    MatIconModule,
  ],
  exports: [
    LoaderComponent,
    DateInputComponent,
    NumberInputComponent,
    AutoCompleteRefDirective,
    TagInputComponent,
  ],
})
export class SharedModule {}
