import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-filter',
  templateUrl: './poe-filter.component.html',
  styleUrls: ['./poe-filter.component.scss']
})
export class PoeFilterComponent implements OnInit {

  public todayDate: Date = new Date();
  private buttonMap: Map<string, boolean> = new Map<string, boolean>();

  @Output() public onPoeFilter: EventEmitter<string | null> = new EventEmitter<string | null>();
  // Cette fonction onPoeFilter() est insérée dans la balise <app-poe-filter> placée dans poe-welcome.component.html
  constructor() { }

  ngOnInit(): void {
    this.buttonMap.set('btnEnCours', false);
    this.buttonMap.set('btnUnMois', true);
    this.buttonMap.set('btnSixMois', false);
    this.buttonMap.set('btnUnAn', false);
    this.buttonMap.set('btnToutes', false);
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
}
