import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public logout(): void {
    this.authService.logout();
  }
}
