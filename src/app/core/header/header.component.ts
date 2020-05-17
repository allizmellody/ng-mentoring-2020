import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../shared/user.model';

@UntilDestroy()
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userLogin: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user
      .pipe(
        untilDestroyed(this),
        filter((value) => Boolean(value))
      )
      .subscribe(
        (user: IUser) => (this.userLogin = user.firstName + ' ' + user.lastName)
      );
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public logout(): void {
    this.authService.logout().then(() => this.router.navigate(['/auth']));
  }
}
