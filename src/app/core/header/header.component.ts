import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public get login(): string {
    const userInfo = this.authService.userInfo;

    if (!userInfo) {
      return '';
    }

    return userInfo.firstName + ' ' + userInfo.lastName;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public logout(): void {
    this.authService.logout().then(() => this.router.navigate(['/auth']));
  }
}
