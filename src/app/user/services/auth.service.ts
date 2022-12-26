import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RequestDto } from '../dto/request-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {    // Ce service remplace le UserService de la précédente implémentation

  private baseUrl = 'http://localhost:8080/';   // The base URL is the backend REST API’s base URL

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  signup(request: RequestDto): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'signup', request,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json' }
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  signin(request: RequestDto): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'signin', request,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      map((response) => {
        sessionStorage.setItem('user', request.userName);
        //sessionStorage.setItem('token', 'HTTP_TOKEN ' + response.token);
        sessionStorage.setItem('token', 'Bearer ' + response.token);
        return response;
      })
    );
  }

  signout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('signin');
  }

  isUserSignedin() {
    return sessionStorage.getItem('token') !== null;
  }

  getSignedinUser() {
    return sessionStorage.getItem('user') as string;
  }

  getToken() {
    return sessionStorage.getItem('token') as string;
  }
}
