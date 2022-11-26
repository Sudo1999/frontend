import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleDetailService {

  private _isDetailHidden$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // BehaviorSubject = observable
        // Le $ à la fin du nom (optionnel) indique que ce n'est pas une donnée mais un observable de la donnée

  constructor() { }

  public get isDetailHidden(): BehaviorSubject<boolean> {     // Ce get est le "getter magique" de Typescript
    return this._isDetailHidden$;
  }

  public setIsDetailHidden(state: boolean): void {
    this._isDetailHidden$.next(state);
  }
}
