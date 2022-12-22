import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-filter',
  templateUrl: './poe-filter.component.html',
  styleUrls: ['./poe-filter.component.scss']
})
export class PoeFilterComponent implements OnInit {

  private buttonMap: Map<string, boolean> = new Map<string, boolean>();
  private minDate!: Date | null;
  private maxDate!: Date | null;
  private poes: Array<Poe> = [];

  //@Input() filterDate: Date | null = null;
  //@Output() public onChangeFilter: EventEmitter<Date | null> = new EventEmitter<Date | null>();
  constructor(    
    private poeService: PoeService
  ) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    });
    this.buttonMap.set('btnEnCours', false);
    this.buttonMap.set('btnUnMois', true);
    this.buttonMap.set('btnSixMois', false);
    this.buttonMap.set('btnUnAn', false);
    this.buttonMap.set('btnToutes', false);
  }

  public getPoeButtonState(buttonName: string): boolean {   // C'est le nom du bouton qui sert de clé
    console.log(`buttonName dans get : ${buttonName} - ${this.buttonMap.get(buttonName)}`);
    return this.buttonMap.get(buttonName)!;  // Le ! autorise l'absence de valeur (dans ce cas le get ne sera pas exécuté)
    // Ce get() retourne l'élément associé à la clé, ici une valeur booléenne, ou s'il n'y en a pas, 'undefined'
  }

  public changePoeButtonState(buttonName: string): void {
    console.log(`buttonName dans change : ${buttonName} - ${this.buttonMap.get(buttonName)}`);
    for(let [key, value] of this.buttonMap) {
      if (key === buttonName) {
        this.buttonMap.set(key, true);  // Ce set() associe une valeur booléenne à la clé concernée
        this.onPoeFilter(buttonName);
        console.log(`${key} is ${this.buttonMap.get(key)}`);
      } else {
        this.buttonMap.set(key, false);
        console.log(`${key} is ${this.buttonMap.get(key)}`);
      }
    }
  }

  public onPoeFilter(buttonName: string): void {
    switch (buttonName) {
      case 'btnEnCours':
        this.minDate = null ;
        this.maxDate = null;
        break;
      case 'btnUnMois':
        this.minDate = null ;
        this.maxDate = null;
        break;
      case 'btnSixMois':
        this.minDate = null ;
        this.maxDate = null;
        break;
      case 'btnUnAn':
        this.minDate = null ;
        this.maxDate = null;
        break;
      case 'btnToutes':
        this.minDate = null ;
        this.maxDate = null;
        break;
      default:
        this.minDate = null ;
        this.maxDate = null;
        break;
    }    
    //this.selectPoes(this.minDate, this.maxDate);
  }

  // public selectPoes(minDate: Date, maxDate: Date): Poe[] {    
  // }
}
