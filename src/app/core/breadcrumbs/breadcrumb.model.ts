import { Route } from '@angular/router';

export interface IBreadcrumb {
  displayName: string;
  terminal: boolean;
  url: string;
  route: Route | null;
}
