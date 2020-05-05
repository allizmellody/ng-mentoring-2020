import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../shared/user.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
  }
}
