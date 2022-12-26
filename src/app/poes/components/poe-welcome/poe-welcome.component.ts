import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, from } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-welcome',
  templateUrl: './poe-welcome.component.html',
  styleUrls: ['./poe-welcome.component.scss']
})
export class PoeWelcomeComponent implements OnInit {

  public todayDate!: Date;
  public period: string = '';
  public poes: Array<Poe> = [];
  public poeNumber: number = 0;

  constructor(
    private poeService: PoeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todayDate = new Date();    // Par défaut new Date() prend comme valeur la date courante
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
      this.poeNumber = this.poes.length;
      // Pour commencer sur le bouton 'Un mois' :
      //this.poeNumber = this.poes.filter((poe: Poe) => this.selectPoe(poe)).length;
    });
    //this.selectPeriod('btnUnMois');
  }

  public selectPeriod(event: string | null): void {   // Le event qui est passé, c'est le buttonName
    // La fonction selectPeriod() est appelée en réponse à un événement onPoeFilter() transmis par poe-filter.component.ts
    // par l'intermédiaire de la balise <app-poe-filter> insérée dans poe-welcome.component.html
    if (event !== null) {
      this.period = event;    // Le nom du bouton qui a déclenché l'événement est récupéré par l'attribut 'period'
    } else {
      this.period = '';
    }
    this.onPoeNumber();
  }

  public selectPoe(poe: Poe): boolean {   // La fonction selectPoe() est appelée individuellement pour chaque poe

    let triggerDate = new Date(
      poe.getEndDate().getFullYear(), poe.getEndDate().getMonth(), poe.getEndDate().getDate());
    let stopDate = new Date(
      poe.getEndDate().getFullYear(), poe.getEndDate().getMonth(), poe.getEndDate().getDate());
    let toolDate;

    switch (this.period) {    // La condition à respecter par la poe varie selon le bouton qui a déclenché l'événement
      case 'btnEnCours':  // 0 - 30
        toolDate = stopDate.getDate() + 30;
        stopDate.setDate(toolDate);
        return stopDate > this.todayDate;
        break;
      case 'btnUnMois':   // 30 - 180
        toolDate = triggerDate.getDate() + 30;
        triggerDate.setDate(toolDate);
        toolDate = stopDate.getDate() + 180;
        stopDate.setDate(toolDate);
        return (triggerDate <= this.todayDate) && (stopDate > this.todayDate);
        break;
      case 'btnSixMois':  // 180 - 365
        toolDate = triggerDate.getDate() + 180;
        triggerDate.setDate(toolDate);
        toolDate = stopDate.getDate() + 365;
        stopDate.setDate(toolDate);
        return (triggerDate <= this.todayDate) && (stopDate > this.todayDate);
        break;
      case 'btnUnAn':     // 365 - 0
        toolDate = triggerDate.getDate() + 365;
        triggerDate.setDate(toolDate);
        return triggerDate <= this.todayDate;
        break;
      case 'btnToutes':   // 0 - 0
        return true;
        break;
      default:            // 0 - 0
        return true;
        break;
    }
  }

  public onPoeNumber(): void {    // onPoeNumber
    console.log('onPoeNumber a été appelé et poeNumber = ' + this.poeNumber);
    this.poeNumber = this.poes.filter((poe: Poe) => this.selectPoe(poe)).length;
  }

  public onRemove(poe: Poe): void {
    console.log(`L'utilisateur souhaite supprimer ${poe.getTitle()}`);
    this.poeService.delete(poe)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.poes.splice(
            this.poes.findIndex((obj: Poe) => obj.getId() === poe.getId()), 1
          )
        }
      });
      this.poeNumber = this.poeNumber - 1;
  }

  public onUpdate(poe: Poe): void {
    this.router.navigate(['/', 'poe', 'update', poe.getId()]);
    // A chaque virgule correspond un slash dans l'adresse
  }
}