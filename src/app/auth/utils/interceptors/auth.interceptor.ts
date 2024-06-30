import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistanceService } from '../../../common/services/persistance.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistance: PersistanceService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = this.persistance.getItem('accessToken');
    request = request.clone({
      setHeaders: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
