import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/services/poe.service';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';

@Component({
  selector: 'app-poe-add-stagiaire',
  templateUrl: './poe-add-stagiaire.component.html',
  styleUrls: ['./poe-add-stagiaire.component.scss']
})
export class PoeAddStagiaireComponent implements OnInit {

  public poe: Poe = new Poe();
  public stagiaires: Array<Stagiaire> = [];
  public stagiairesIdsToAdd: Array<number> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private poeService: PoeService,
    private stagiaireService: StagiaireService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((routeParams: Params) => {
        const poeId: number = routeParams['id'];
        this.poeService.findOne(poeId)
          .subscribe((poe: Poe) => {
            this.poe = poe;
            this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
              // All stagiaires
              const allStagiaires = stagiaires;
              // Filtered stagiaires
              const filteredStagiaires = allStagiaires.filter((stagiaireToCheck: Stagiaire) => {
                return !this.poe.getStagiaires().find(element => element['id'] === stagiaireToCheck.getId());
              });
              this.stagiaires = filteredStagiaires;
            });
          });
      });
  }

  public onListSelectionChange(obj: MatSelectionListChange): void {
    const selectedObj: Array<any> = obj.source.selectedOptions.selected;
    this.stagiairesIdsToAdd = selectedObj.map(stagiaireInSelection => stagiaireInSelection.value);
    console.log('>> ids to add: ', this.stagiairesIdsToAdd);
  }

  public onAddManyStagiaires(): void {
    this.poeService.addManyStagiaires(this.poe.getId(), this.stagiairesIdsToAdd)
    .subscribe((poe: Poe) => {
      this.poe = poe;
      this.router.navigate(['/', 'poe', 'detail', this.poe.getId()]);
    });
  }

  public onBackButton(): void {
    this.location.back();
  }
}
