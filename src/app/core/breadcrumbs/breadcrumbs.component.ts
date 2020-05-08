import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
