import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'agmp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public isLoading: Observable<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}
}
