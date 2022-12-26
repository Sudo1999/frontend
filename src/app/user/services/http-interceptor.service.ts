import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserSignedin() && this.authService.getToken()) {
      const requestclone = request.clone({
        headers: new HttpHeaders({ 'Authorization': this.authService.getToken() })  // 'Authorization: Bearer ' + this.etc. ?
      });
      return next.handle(requestclone)
        .pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {   // JWT token gets expired
              this.authService.signout();
            }
            return throwError(() => new Error('Error reported.'));
          })
        );
    }
    return next.handle(request);
    //throw new Error('Method not implemented.');
  }
}
