import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {AppSandbox} from './app.sandbox';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private sb: AppSandbox) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpCallRequested();
    return next.handle(request)
      .finally(() => this.httpCallReady());
  }

  private httpCallReady(): void {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.sb.hideSpinner();
    }
  }

  private httpCallRequested(): void {
    if (this.activeRequests === 0) {
      this.sb.showSpinner();
    }
    this.activeRequests++;
  }

}
