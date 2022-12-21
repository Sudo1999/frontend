import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of, map, take } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';
import { FormBuilderService } from '../formbuilder/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class PoeResolver implements Resolve<FormGroup> {

  public constructor (
    private route: ActivatedRoute,
    private poeService: PoeService,
    private formBuilderService: FormBuilderService
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {
    const id: number = +route.paramMap.get('id')!;
    console.log(`Got ${id} from Resolver`);
    let poe: Poe;
    let form: FormGroup;

    if (id === 0) {
      poe = new Poe();
      form = this.formBuilderService.build(poe).getForm();
      return of(form);
    } else {
      return this.poeService.findOne(id)
        .pipe(
          take(1),
          map((mapPoe: Poe) => {
            return this.formBuilderService.build(mapPoe).getForm();
          })
        )
    }
    //return of(true);
  }
}
