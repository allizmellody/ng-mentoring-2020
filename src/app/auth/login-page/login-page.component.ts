import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  public login(): void {
    this.authService.login({ email: this.email, password: this.password });
  }
}
