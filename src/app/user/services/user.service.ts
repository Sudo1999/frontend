import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IStorageStrategy } from 'src/app/core/strategies/storage/i-storage-strategy';
import { LocalStrategy } from 'src/app/core/strategies/storage/local-strategy';
import { SessionStrategy } from 'src/app/core/strategies/storage/session-strategy';
import { environment } from 'src/environments/environment';
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
  // Le $ est utilisé pour les observables (c'est une convention).
  // Il signifie que ce n'est pas une donnée mais un observable de donnée.
  private _storageStrategy!: IStorageStrategy;

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

    // Get the strategy to use the store
    if (formData.stayConnected) {
      this._storageStrategy = new LocalStrategy();
    } else {
      this._storageStrategy = new SessionStrategy();
    }
    this._storageStrategy.storeItem('auth', JSON.stringify(this._user));
    // Suite normale
    this.hasUser$.next(true);
    return of(true);
  }

  public logout(): void {
    this._user = null;
    this.router.navigate(['/', 'login']);
    this.hasUser$.next(false);
  }

  private _readStorage(storage: IStorageStrategy): void {
    const storedItem: string | null = storage.getItem(`${environment.storageKeys.AUTH}`);
    if (storedItem !== null) {
      const storedUser = JSON.parse(storedItem);
      this._user = new User();
      this._user.id = storedUser._id;
      this._user.login = storedUser._login;
      this.hasUser$.next(true);
    }
  }
  
  public hasUser(): BehaviorSubject<boolean> {
    if(!this._user) {
      this._readStorage(new LocalStrategy());
      this._readStorage(new SessionStrategy());
    }
    return this.hasUser$;
  }

  private _removeItem(storage: IStorageStrategy): void {
    storage.removeItem(`${environment.storageKeys.AUTH}`);
  }
}
