import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  declarations: [ButtonComponent, IconComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  exports: [ButtonComponent, IconComponent],
})
export class SharedModule {}
