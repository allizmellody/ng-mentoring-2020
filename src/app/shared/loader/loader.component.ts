import { Component } from '@angular/core';

import { LoaderService } from './loader.service';

@Component({
  selector: 'agmp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public isLoading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => (this.isLoading = v));
  }
}
