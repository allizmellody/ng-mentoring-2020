import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { BreadcrumbService } from './breadcrumb.service';
import { IBreadcrumb } from './breadcrumb.model';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[] = [];

  constructor(
    public authService: AuthService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
      this.breadcrumbs = crumbs;
    });
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
