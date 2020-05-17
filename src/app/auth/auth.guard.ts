import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  private get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  canLoad(route: Route): Observable<boolean> {
    if (!this.isLoggedIn) {
      this.router.navigate(['auth']);
    }

    return of(true);
  }
}
