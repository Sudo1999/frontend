import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RequestDto } from '../dto/request-dto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {    // Ce AuthService remplace le UserService de la précédente implémentation

  private baseUrl = 'http://localhost:8080/';   // The base URL is the backend REST API’s base URL
  public canActivate!: boolean;    // Essai d'aménagement pour pouvoir utiliser le guard

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
        // Essai d'aménagement pour pouvoir utiliser le guard :
        //this.canActivate = true;
        return response;
      })
    );
  }

  signout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    // Essai d'aménagement pour pouvoir utiliser le guard :
    //this.canActivate = false;
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
