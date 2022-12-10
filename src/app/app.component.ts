import { Component } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/services/stagiaire.service';

@Component({
  selector: 'app-root',   // AppComponent s'affiche grâce à la balise <app-root> qui est placée dans index.html
  templateUrl: './app.component.html',    // Dans index.html, la balise <app-root> appelle app.component.html
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'Suivi des stagiaires';

  // On veut revenir à l'état initial après le clic :
  public toggleTitle(): void {
    if (this.title == "Suivi des stagiaires") {
      this.title = "Hello Angular";
    } else {
      this.title = "Suivi des stagiaires";
    }
  }

  public stagiaires: Array<Stagiaire> = this.stagiaireService.getStagiaires();
  public inputType: string = 'password';
  public titreHtml = 'HyperText Markup Language';

  public constructor(
    private stagiaireService: StagiaireService    // Injection de dépendance
  ) {}

  public addStagiaire(): void {
    //this.stagiaires.push('Dummy stagiaire');
  }

  public showPassword(): void {
    if(this.inputType === 'password') {
      this.inputType = 'Text';
      setTimeout(
        () => {this.inputType = 'password'}, 1600
      )
    }
  }
}
