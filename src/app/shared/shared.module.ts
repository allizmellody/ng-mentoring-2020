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
import { AutoCompleteComponent } from './autocomplete/autocomplete.component';
import { AutoCompleteRefDirective } from './autocomplete/autocomplete.directive';
import { HighlightPipe } from './autocomplete/highlight.pipe';

@NgModule({
  declarations: [
    DialogComponent,
    LoaderComponent,
    DateInputComponent,
    NumberInputComponent,
    HighlightPipe,
    AutoCompleteComponent,
    AutoCompleteRefDirective,
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
  ],
  exports: [
    LoaderComponent,
    DateInputComponent,
    NumberInputComponent,
    AutoCompleteComponent,
    AutoCompleteRefDirective,
  ],
})
export class SharedModule {}
