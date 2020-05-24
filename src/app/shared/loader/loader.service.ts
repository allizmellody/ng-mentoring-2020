import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject(false);
  private prevent: boolean;

  set prevented(value: boolean) {
    this.prevent = value;
  }

  public get isLoading() {
    return this.loading.asObservable();
  }

  public toggle(value: boolean) {
    this.prevent = false;
    this.loading.next(value);
  }

  public showNotPrevented() {
    if (!this.prevent) {
      this.loading.next(true);
    }
  }

  public hide() {
    this.loading.next(false);
  }
}
