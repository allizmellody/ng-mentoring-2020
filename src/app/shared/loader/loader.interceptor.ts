import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.toggle(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);

    this.loaderService.showNotPrevented();
    return new Observable((subscriber) => {
      const subscription = next
        .handle(req)
        .pipe(finalize(() => this.removeRequest(req)))
        .subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              subscriber.next(event);
            }
          },
          (err) => {
            subscriber.error(err);
          },
          () => {
            subscriber.complete();
          }
        );

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
