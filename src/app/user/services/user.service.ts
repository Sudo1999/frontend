import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserDto } from '../dto/user-dto';
import { User } from '../models/user';

// @TODO remove after wiring to backend
const users: UserDto[] = [
  {
    id: 1,
    login: 'admin',
    password: 'admin'
  },
  {
    id: 2,
    login: 'guest',
    password: 'guest'
  }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;
  public hasUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router
  ) { }

  public login(formData: any): Observable<boolean> { // Observable = Pas la donnée mais un objet qui observe la donnée
    const userIndex: number = users.findIndex((user: UserDto) =>
      user.login === formData.userLogin && user.password === formData.userPassword)
    if (userIndex === -1) {
      this.hasUser$.next(false);    // Notify subscribers of a new value
      return of(false);   // of = retourne l'observable d'un booléen à la place d'un booléen
    }
    // Else = Got a user
    this._user = new User();
    this._user.id = users[userIndex].id!;
    this._user.login = users[userIndex].login;
    this.hasUser$.next(true);
    return of(true);
  }

  public logout(): void {
    this._user = null;
    this.router.navigate(['/', 'login']);
    this.hasUser$.next(false);
  }
  
  public hasUser(): BehaviorSubject<boolean> {
    return this.hasUser$;
  }
}
