import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/shared/error-state-matcher';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public matcher = new FormErrorStateMatcher();
  public loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  public onSubmit(data): void {
    if (this.loginForm.valid) {
      this.authService
        .login(data)
        .then(() => this.router.navigate(['/courses']));
    }
  }
}
