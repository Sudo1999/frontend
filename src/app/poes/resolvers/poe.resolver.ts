import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PoeService } from 'src/app/core/services/poe.service';
import { FormBuilderService } from '../formbuilder/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class PoeResolver implements Resolve<boolean> {

  public constructor (
    private route: ActivatedRoute,
    private poeService: PoeService,
    private formBuilderService: FormBuilderService
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}
