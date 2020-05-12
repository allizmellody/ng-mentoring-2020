import { HostListener, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DialogService } from './dialog/dialog.service';

export abstract class CanComponentDeactivate {
  abstract canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;

  @HostListener('window:beforeunload', ['$event'])
  canLeavePage($event: any): void {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  constructor(
    private location: Location,
    private router: Router,
    private dialogService: DialogService
  ) {}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ) {
    if (!component.canDeactivate || component.canDeactivate()) {
      return true;
    }

    if (this.router.getCurrentNavigation().trigger === 'popstate') {
      this.location.go(currentState.url);
    }

    return this.dialogService
      .open({
        text:
          'You have unsaved changes! If you leave, your changes will be lost.',
        confirm: 'confirm',
      })
      .pipe(map((result) => result === 'confirm'));
  }
}
