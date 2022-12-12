import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.scss']
})
export class StagiaireFormComponent implements OnInit {

  stagiaireForm!: FormGroup;
  public addMode: boolean = true;

  constructor(
    private stagiaireService: StagiaireService,  // Injection de dépendance
    private formBuilderService: FormBuilderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(`${data.form instanceof FormGroup ? 'OK' : 'KO'}`);
    this.stagiaireForm = data.form;

    console.log(this.stagiaireForm.controls['id'] instanceof FormControl);
    (data.form.value.id !== 0) ? this.addMode = false : this.addMode = true;

    this.route.url    // Observable
        .subscribe((url: UrlSegment[]) => {          
          console.log(url);
          // Suis-je en mode update ou add ?
          if(url.filter((urlSegment: UrlSegment) => urlSegment.path === 'update').length) {
            // Si tableau vide => on n'a pas trouvé update
              console.log('Mode update');
              this.addMode = false;
              // On récupère le id du stagiaire :
              //this.stagiaireService.findOne(parseInt(url[url.length - 1].path));
              this.stagiaireService.findOne(+url[url.length - 1].path) // Le + permet de renvoyer un chiffre (c'est un raccourci)
              .subscribe((stagiaire: Stagiaire) => {
                console.log(`Got ${stagiaire.getId()} ready to update`);
                this.stagiaireForm = this.formBuilderService.build(stagiaire).getForm();
              });
          } else {
            console.log('Mode add');
          }
        });
    this.stagiaireForm = this.formBuilderService.build(new Stagiaire()).getForm();
  }

  // Méthode "helper"

  /**
   * Returns a list of form controls
   * @usage In template : c['lastname']
   * instead of stagiaireForm.controls['lastname']
   */
  public get c(): { [key: string]: AbstractControl } {
    return this.stagiaireForm.controls;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("Le onSubmit a fonctionné : ");
    console.log(this.stagiaireForm.value);
    console.log("Delegate add stagiaire:", this.stagiaireForm.value);
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);

    let subscription: Observable<any>;
    if (this.addMode) {
      subscription = this.stagiaireService.add(dto);
    } else {
      // Invoke service update method
      subscription = this.stagiaireService.update(
        this.stagiaireForm.value
      )
    }
    subscription.subscribe(() => this.goHome());
  }

  public goHome(): void {
    this.router.navigate(['/', 'home']);
  }
}
