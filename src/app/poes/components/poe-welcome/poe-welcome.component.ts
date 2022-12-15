import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-welcome',
  templateUrl: './poe-welcome.component.html',
  styleUrls: ['./poe-welcome.component.scss']
})
export class PoeWelcomeComponent implements OnInit {

  public poes: Array<Poe> = [];

  constructor(
    private poeService: PoeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    })
  }

  public onRemove(poe: Poe): void {
    console.log(`L'utilisateur souhaite supprimer ${poe.getTitle()}`);
    this.poeService.delete(poe)
    .subscribe({
      next: (response: HttpResponse<any>) => {
        this.poes.splice(
          this.poes.findIndex((p: Poe) => p.getId() === poe.getId()), 1)
      }
    });
    const poeIndex: number = this.poes.findIndex(
      (obj: Poe) => obj.getId() == poe.getId());
  }

    public onUpdate(poe: Poe): void {
      this.router.navigate(['/', 'poe', 'update', poe.getId()]);
      // A chaque virgule correspond un slash dans l'adresse
    }
}