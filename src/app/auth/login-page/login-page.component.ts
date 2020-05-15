import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public userLogin: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public login(): void {
    this.authService
      .login({ login: this.userLogin, password: this.password })
      .then(() => this.router.navigate(['/courses']));
  }

  public onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
