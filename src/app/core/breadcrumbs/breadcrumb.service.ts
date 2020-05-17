import { Injectable, EventEmitter } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  Event,
  NavigationEnd,
} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IBreadcrumb } from './breadcrumb.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  public breadcrumbChanged = new EventEmitter<IBreadcrumb[]>(false);

  constructor(private router: Router) {
    this.router.events.pipe(untilDestroyed(this)).subscribe((routeEvent) => {
      this.onRouteEvent(routeEvent);
    });
  }

  private breadcrumbs = new Array<IBreadcrumb>();

  private static createBreadcrumb(
    route: ActivatedRouteSnapshot,
    url: string
  ): IBreadcrumb {
    return {
      displayName: route.data.breadcrumb,
      terminal: this.isTerminal(route),
      route: route.routeConfig,
      url,
    };
  }
  private static isTerminal(route: ActivatedRouteSnapshot) {
    return (
      route.firstChild === null ||
      route.firstChild.routeConfig === null ||
      !route.firstChild.routeConfig.path
    );
  }

  private static createUrl(route: ActivatedRouteSnapshot) {
    return route.url.map((s) => s.toString()).join('/');
  }

  private static createRootUrl(route: ActivatedRouteSnapshot) {
    let url = '';
    let next = route.root;

    while (next.firstChild !== null) {
      next = next.firstChild;

      if (next.routeConfig === null) {
        continue;
      }
      if (!next.routeConfig.path) {
        continue;
      }

      url += `/${BreadcrumbService.createUrl(next)}`;
    }

    return url;
  }

  public changeBreadcrumb(route: ActivatedRouteSnapshot, name: string) {
    const rootUrl = BreadcrumbService.createRootUrl(route);
    const breadcrumb = this.breadcrumbs.find((bc) => bc.url === rootUrl);

    if (!breadcrumb) {
      return;
    }

    breadcrumb.displayName = name;

    this.breadcrumbChanged.emit(this.breadcrumbs);
  }

  private onRouteEvent(routeEvent: Event) {
    if (!(routeEvent instanceof NavigationEnd)) {
      return;
    }

    let route = this.router.routerState.root.snapshot;
    let url = '';

    let breadCrumbIndex = 0;
    const newCrumbs = [];

    while (route.firstChild != null) {
      route = route.firstChild;

      if (route.routeConfig === null) {
        continue;
      }
      if (!route.routeConfig.path) {
        continue;
      }

      url += `/${BreadcrumbService.createUrl(route)}`;

      if (!route.data.breadcrumb) {
        continue;
      }

      const newCrumb = BreadcrumbService.createBreadcrumb(route, url);

      if (breadCrumbIndex < this.breadcrumbs.length) {
        const existing = this.breadcrumbs[breadCrumbIndex++];

        if (existing && existing.route === route.routeConfig) {
          newCrumb.displayName = existing.displayName;
        }
      }

      newCrumbs.push(newCrumb);
    }

    this.breadcrumbs = newCrumbs;
    this.breadcrumbChanged.emit(this.breadcrumbs);
  }
}
