import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { LoaderService } from './loader.service';

@UntilDestroy()
@Component({
  selector: 'agmp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public isLoading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading
      .pipe(untilDestroyed(this))
      .subscribe((v) => (this.isLoading = v));
  }
}
