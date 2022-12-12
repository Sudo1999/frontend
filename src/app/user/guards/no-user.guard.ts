import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoUserGuard implements CanActivate {

  // Récupérer le UserService :
  public constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //const hasUser: boolean = this.userService.hasUser();
    if (this.userService.hasUser().getValue()) {
      this.router.navigate(['/', 'home']);
      return false;   // La route ne doit pas être activée
    }
    return true;
  }
}
