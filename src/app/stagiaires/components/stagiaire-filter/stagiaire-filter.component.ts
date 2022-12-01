import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stagiaire-filter',       // On met un appel à ce sélecteur dans stagiaire-table-component.html
  templateUrl: './stagiaire-filter.component.html',
  styleUrls: ['./stagiaire-filter.component.scss']
})
export class StagiaireFilterComponent implements OnInit {

  private buttonMap: Map<string, boolean> = new Map<string, boolean>();

  @Input() filterDate: Date | null = null;
  @Output() public onChangeFilter: EventEmitter<Date | null> = new EventEmitter<Date | null>();
  constructor() { }

  ngOnInit(): void {
    this.buttonMap.set('btnAll', true);
    this.buttonMap.set('btnLT1950', false);
    this.buttonMap.set('btnGT1950', false);

    if(this.filterDate === null) {
      this.changeButtonState('btnAll');
    } else {
      // Si le jour est le 31 je veux les personnes nées après 1950, sinon avant 1950
      if(this.filterDate.getDate() === 31) {
        this.changeButtonState('btnGT1950');
      } else {
        this.changeButtonState('btnLT1950');
      }
    }
  }

  public getButtonState(key: string): boolean {
    return this.buttonMap.get(key)!;    // Le ! autorise l'absence de valeur (dans ce cas le get ne sera pas exécuté)
  }

  public changeButtonState(button: string): void {
    // Have to change the value of key to true, others to false
    this.buttonMap.forEach((value: boolean, key: string) => {
        if (key === button) {
            this.buttonMap.set(key, true);
        } else {
          this.buttonMap.set(key, false);
        }
    });

    // Now emit the Event...
    if (button === 'btnAll') {
      this.onChangeFilter.emit(null);
    } else if (button === 'btnGT1950') {
      this.onChangeFilter.emit(new Date(1950, 11, 31));
    } else {
      this.onChangeFilter.emit(new Date(1950, 0, 1));
    }
  }
}
