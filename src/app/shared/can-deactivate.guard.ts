import { Component, Inject, Injectable, InjectionToken } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

import { DialogService } from './dialog/dialog.service';
import { IChangeDetector } from './change-detector.model';

export const CHANGE_DETECTOR = new InjectionToken('Change Detector');

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<Component> {
  constructor(
    private location: Location,
    private router: Router,
    private dialogService: DialogService,
    @Inject(CHANGE_DETECTOR) private changeDetector: IChangeDetector
  ) {}

  canDeactivate(
    component: Component,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ) {
    if (!this.changeDetector.checkChanges) {
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
      .pipe(
        map((result) => {
          if (result === 'confirm') {
            this.changeDetector.checkChanges = false;
            return true;
          }
        }),
        untilDestroyed(this)
      );
  }
}
