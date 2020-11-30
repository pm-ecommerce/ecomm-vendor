import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  public getToken(): string {
    return localStorage.getItem('token');
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.getToken()) {
      return next.handle(req);
    }

    const request = req.clone({
      setHeaders: {
        Authorization: `${this.getToken()}`
      }
    });

    return next.handle(request);
  }
}
