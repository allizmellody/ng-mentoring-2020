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
import { AutosuggestInputComponent } from './autosuggest-input/autosuggest-input.component';
import { AutosuggestInputDirective } from './autosuggest-input/autosuggest-input.directive';
import { HighlightPipe } from './autosuggest-input/highlight.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DialogComponent,
    LoaderComponent,
    DateInputComponent,
    NumberInputComponent,
    AutosuggestInputComponent,
    AutosuggestInputDirective,
    HighlightPipe,
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
    AutosuggestInputDirective,
    AutosuggestInputComponent,
  ],
})
export class SharedModule {}
