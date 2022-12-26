import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  private baseUrl = 'http://localhost:8080/greet';

  constructor(
    private http: HttpClient
  ) { }

  getByUserRole(): Observable<string> {
    return this.http.get<string>(
      this.baseUrl + '/user', { responseType: 'text' as 'json' }
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getByAdminRole(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + '/admin', { responseType: 'text' as 'json' }
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getByUserOrAdminRole(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + '/userOrAdmin', { responseType: 'text' as 'json' }
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getByAnonymousRole(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + '/anonymous', { responseType: 'text' as 'json' }
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
