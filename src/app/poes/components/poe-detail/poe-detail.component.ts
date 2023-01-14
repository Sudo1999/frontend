import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/services/poe.service';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';

@Component({
  selector: 'app-poe-detail',
  templateUrl: './poe-detail.component.html',
  styleUrls: ['./poe-detail.component.scss']
})
export class PoeDetailComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = [];
  public poes: Array<Poe> = [];

  @Input() poe!: Poe | null;      // L'input provient du parent (Le '!' permet de ne pas l'initialiser tout de suite)
  @Output() public onCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();     // L'output est envoyé au parent
  constructor(
    private route: ActivatedRoute,
    private poeService: PoeService,
    private stagiaireService: StagiaireService
  ) { }

  ngOnInit(): void {
    this.route.params     // C'est un observable => il faut souscrire
    .subscribe((routeParams: Params) => {
      console.log('Route params ', JSON.stringify(routeParams));
      const poeId: number = routeParams['id'];
      console.log('Id was : ', poeId);
      this.poeService.findOne(poeId)
        .subscribe((poe: Poe) => {
          this.poe = poe;
          this.poe.getStagiaires().map((inputStagiaire: any) => {
            const stagiaire: Stagiaire = new Stagiaire();
            stagiaire.setId(inputStagiaire.id);
            stagiaire.setLastName(inputStagiaire.lastName);
            stagiaire.setFirstName(inputStagiaire.firstName);
            stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
            stagiaire.setEmail(inputStagiaire.email);
            stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
            this.stagiaires.push(stagiaire);
            return stagiaire;
          })
        });
    });
  }

  public addStagiaireToPoe(poe: Poe, stagiaire: Stagiaire): void {
    console.log("L'utilisateur veut ajouter un stagiaire dans cette poe");
  }  
  
  public deleteStagiaireFromPoe(poe: Poe, stagiaire: Stagiaire): void {
    //console.log("Remove stagiaire: ", stagiaire.getLastName(), " from poe: ", poe.getTitle());
    // this.poeService.deleteStagiaire(poe, stagiaire)
    // .subscribe({
    //   next: (response: HttpResponse<any>) => {
    //     this.poes.splice(stagiaire.getId(), 1)
    //   }
    // });
  }
}
