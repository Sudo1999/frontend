import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-detail',
  templateUrl: './stagiaire-detail.component.html',
  styleUrls: ['./stagiaire-detail.component.scss']
})
export class StagiaireDetailComponent implements OnInit {
// Ce composant est un composant enfant de stagiaire-table.component, dont la page html insère son sélecteur

  public stagiaires: Array<Stagiaire> = [];

  @Input() stagiaire!: Stagiaire | null;   // L'input provient du parent (Le '!' permet de ne pas l'initialiser tout de suite)
  @Output() public onCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>(); // L'output est envoyé au parent
  constructor(
    private handleDetailService: HandleDetailService,    // On injecte handleDetailService
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params     // C'est un observable => il faut souscrire
    .subscribe((routeParams: Params) => {
      console.log('Route params ', JSON.stringify(routeParams))
      const stagiaireId: number = routeParams['id'];
      console.log('Id was : ', stagiaireId);
      this.stagiaireService.findOne(stagiaireId)
      .subscribe((stagiaire: Stagiaire) => {
        this.stagiaire = stagiaire;
      })
    })
  }
  
  public onClose(): void {
    this.router.navigate(['/', 'home']);
  }

  public ouvrePopUp() {
    let windowFeatures = "left=800,top=400,width=350,height=350";
    window.open(undefined, "_blank", windowFeatures);
  }

  // Exercice du Bubble :
  public bubbleConfig: any = {
    height: '3em',
    width: '3em',
    lineHeight: '3em',
    backgroundColor: 'rgba(80, 80, 255, .5)',
    borderColor: 'rgba(120, 120, 255, .9)',
    borderStyle: 'solid',
    borderRadius: '50%',
    color: '#fff',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
  }
}
