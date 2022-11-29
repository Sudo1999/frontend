import { HttpResponse } from '@angular/common/http';
import { convertFromMaybeForwardRefExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-table',    // La balise <app-stagiaire-table> est située dans app.component.html
  templateUrl: './stagiaire-table.component.html',  // Elle appelle la page stagiaire-table.component.html
  styleUrls: ['./stagiaire-table.component.scss']
})
export class StagiaireTableComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = []; // On le rajoute après avoir modifié le constructeur
  public stopDate: Date | null = new Date(1950, 11, 31);   // On le rajoute pour introduire la condition dans le html
  public selectedStagiaire: Stagiaire | null = null;
  public isDetailHidden$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  //constructor() { }
  constructor(
    private stagiaireService: StagiaireService,       // Injection de dépendance
    private handleDetailService: HandleDetailService,
    private router: Router
  ) {}

  // Exécution du constructeur, puis ensuite de Init :
  ngOnInit(): void {    
    this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
      this.stagiaires = stagiaires;
    })    
    this.isDetailHidden$ = this.handleDetailService.isDetailHidden;
  }

  public onRemove(stagiaire: Stagiaire): void {
    console.log(`L'utilisateur souhaite supprimer ${stagiaire.getLastName()}`);
    this.stagiaireService.delete(stagiaire)
    // Post-routage :
    .subscribe({
      next: (response: HttpResponse<any>) => {
        this.stagiaires.splice(
          this.stagiaires.findIndex((s: Stagiaire) => s.getId() === stagiaire.getId()), 1)
          // Snackbar
      }
    });

    //this.stagiaires.splice(stagiaire.getId(), 1);   // On ne fait pas ça comme ça
    // pour ne pas mettre la logique ici, et pour la reproductibilité
    const stagiaireIndex: number = this.stagiaires.findIndex(
      (obj: Stagiaire) => obj.getId() == stagiaire.getId());
    this.stagiaires.splice(stagiaireIndex, 1);
  }

  public onFilter(): number {
    let mynumber!: number;
    if (this.stopDate === null) {
      return this.stagiaires.length;
    } else if (this.stopDate.getDate() === 31) {
      mynumber = this.stagiaires.filter(stagiaire => stagiaire.getBirthDate() > this.stopDate!).length;
    } else {
      mynumber = this.stagiaires.filter(stagiaire => stagiaire.getBirthDate() < this.stopDate!).length;
    }    
    return mynumber;
  }

  public filterChanged(event: Date | null): void {
    console.log(`Filter has changed to : ${event}`);
    this.stopDate = event;
  }

  public getVisibleStagiaireNumber(): number {
    return this.stagiaireService.getVisibleStagiaireNumber(this.stopDate);
  }

  public changeView(stagiaire: Stagiaire): boolean {
    let thisdate: Date | null = this.stopDate;    // Pour réaménager la fonction
    if (this.stopDate === null) {
      return true;
    }
    if (this.stopDate.getDate() === 31) {
      return stagiaire.getBirthDate() > this.stopDate;
    }
    return stagiaire.getBirthDate() < this.stopDate;
    /*
    La fonction getVisibleStagiaireNumber(date) dans stagiaire.service.ts fonctionne correctement. Son principe :
    return (date.getDate() === 31) ?
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date).length :
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date).length;

      Ici ça devrait donner :
      return (thisdate.getDate() === 31) ?
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > thisdate).length :
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < thisdate).length;
    */
  }

  // Exercice du detail-component :

  // public onClick(stagiaire: Stagiaire): void {
  //   // Pour commencer je vais afficher un element, puis si ça marche, un composant
  //   //console.log(JSON.stringify(stagiaire));
  //   //this.isDetailHidden = false;
  //   this.handleDetailService.setIsDetailHidden(false);
  //   this.selectedStagiaire = stagiaire;   
    // Exercice du handle-detail.service :
  //   this.handleDetailService.setIsDetailHidden(false);    // On le met pour tester le console.log du ngOnInit
  // }

  public onClick(stagiaire: Stagiaire): void {
    this.router.navigate(['/', 'stagiaire', stagiaire.getId()]);
  }

  // public onDetailClose(event: boolean): void {     // On l'efface quand on bascule sur isDetailHidden$
  //   this.isDetailHidden = event;
  // }

  // Exercice du bubble : on définit ici le [config] du <span appBubble> de stagiaire-table.component.html

  public bubbleConfig: any = {
    height: '2em',
    width: '2em',
    lineHeight: '2em',
    backgroundColor: 'rgba(80, 80, 255, .5)',
    borderRadius: '50%',
    color: '#fff',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
  }
}
