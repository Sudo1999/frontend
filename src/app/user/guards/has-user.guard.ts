import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HasUserGuard implements CanActivate {

  public constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Pour adapter le guard à l'authentification via le SigninFormComponent on pourrait modifier la fonction ici :
      //if (this.authService.canActivate) {
      if (this.userService.hasUser().getValue()) {
      return true;
    }
    // No user, go to login
    this.router.navigate(['/', 'signin']);
    return false;
  }
}
