import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';
import { FormBuilderService } from '../../formbuilder/form-builder.service';

@Component({
  selector: 'app-stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.scss']
})
export class StagiaireFormComponent implements OnInit {

  public stagiaireForm!: FormGroup;
  public addMode: boolean = true;

  constructor(
    private stagiaireService: StagiaireService,  // Injection de dépendance
    private formBuilderService: FormBuilderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    this.stagiaireForm = data.form;
    console.log(`${this.stagiaireForm instanceof FormGroup ? 'stagiaireForm OK' : 'stagiaireForm KO'}`);
    console.log(this.stagiaireForm.value.id);

    this.route.url    // Observable
      .subscribe((url: UrlSegment[]) => {
        // Suis-je en mode update ou add ?
        console.log(url);
        console.log(url.filter((urlSegment: UrlSegment) => urlSegment.path === 'update').length);
        if (url.filter((urlSegment: UrlSegment) => urlSegment.path === 'update').length) {
          // Si le tableau n'est pas vide, length n'est pas nul => on a trouvé update
          console.log('Mode update');
          this.addMode = false;
          // On récupère le id du stagiaire :
          this.stagiaireService.findOne(+url[url.length - 1].path) // +url est un raccourci de parseInt(url)
            .subscribe((stagiaire: Stagiaire) => {
              console.log(`Got ${stagiaire.getId()} ready to update`);
              this.stagiaireForm = this.formBuilderService.build(stagiaire).getForm();
            });
        } else {
          console.log('Mode add');
        }
      });
  }

  /**
   * Returns a list of form controls
   * @usage In template : c['lastname']
   * instead of stagiaireForm.controls['lastname']
   */
  public get c(): { [key: string]: AbstractControl } {
    return this.stagiaireForm.controls;
  }

  onSubmit() {
    console.log("Le onSubmit a fonctionné.");
    console.log("Delegate add stagiaire:", this.stagiaireForm.value);
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);

    let subscription: Observable<any>;
    if (this.addMode) {
      // Invoke service add method
      subscription = this.stagiaireService.add(dto);
    } else {
      // Invoke service update method
      subscription = this.stagiaireService.update(
        this.stagiaireForm.value
      )
    }
    subscription.subscribe(() => this.goList());
  }

  public goList(): void {
    this.router.navigate(['/', 'stagiaire']);
  }
}
