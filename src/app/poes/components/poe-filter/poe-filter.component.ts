import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';
import { TodayService } from 'src/app/core/services/today.service';

@Component({
  selector: 'app-poe-filter',
  templateUrl: './poe-filter.component.html',
  styleUrls: ['./poe-filter.component.scss']
})
export class PoeFilterComponent implements OnInit {

  public todayDate: Date = new Date();
  public fetes: string = '';
  public cestarrive: string = '';
  private buttonMap: Map<string, boolean> = new Map<string, boolean>();

  @Output() public onPoeFilter: EventEmitter<string | null> = new EventEmitter<string | null>();
  // Cette fonction onPoeFilter() est insérée dans la balise <app-poe-filter> placée dans poe-welcome.component.html
  constructor(
    private todayService: TodayService
  ) { }

  ngOnInit(): void {
    this.buttonMap.set('btnEnCours', false);
    this.buttonMap.set('btnUnMois', false);
    this.buttonMap.set('btnSixMois', false);
    this.buttonMap.set('btnUnAn', false);
    this.buttonMap.set('btnToutes', true);
  }

  public getPoeButtonState(buttonName: string): boolean {   // C'est le nom du bouton qui sert de clé
    return this.buttonMap.get(buttonName)!;  // Le ! autorise l'absence de valeur (dans ce cas le get ne sera pas exécuté)
    // Ce get() retourne l'élément associé à la clé, ici une valeur booléenne, ou s'il n'y en a pas, 'undefined'
  }

  public changePoeButtonState(buttonName: string): void {
    for (let [key, value] of this.buttonMap) {
      if (key === buttonName) {
        this.buttonMap.set(key, true);  // Ce set() associe une valeur booléenne à la clé concernée
        this.onPoeFilter.emit(buttonName);
      } else {
        this.buttonMap.set(key, false);
      }
    }
  }

  public getFetes(): string {   // getFetes est considérée comme une propriété
    if (this.todayDate.getMonth() === 0) {
      //return TodayService.getTodayFetes(`01-${this.todayDate.getDate()}`);      
      //this.fetes = `01-${this.todayDate.getDate()}`;
      return '';
    } else {
      //return this.fetes = `${this.todayDate.getMonth() + 1}-${this.todayDate.getDate()}`;
      return this.todayService.getTodayFetes(`${this.todayDate.getMonth() + 1}-${this.todayDate.getDate()}`);
    }
  }

  public getCestarrive(): string {    // getCestarrive est considérée comme une propriété
    return this.cestarrive = 'yyy';
  }
}
