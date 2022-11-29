import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  //stagiaire: Stagiaire = new Stagiaire();
  stagiaireForm!: FormGroup;

  /*
  stagiaireForm: FormGroup = new FormGroup({
    //firstName: FormControl = new FormControl('')
    //lastName: FormControl = new FormControl('')
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$")),
    //birthDate: new FormControl(new Date())
    birthDate: new FormControl('')
  });*/

  // stagiaireForm: FormGroup = new FormGroup({
  //   lastName: new FormControl('', Validators.required),
  //   firstName: new FormControl('', Validators.required),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   phoneNumber: new FormControl('', Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$")),
  //   //birthDate: new FormControl(new Date())
  //   birthDate: new FormControl('')
  // });

  constructor( 
    private stagiaireService: StagiaireService,  // Injection de dépendance
    private formBuilderService: FormBuilderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stagiaireForm = this.formBuilderService.build().getForm();
  }

  // Méthode "helper"

  /**
   * Returns a list of form controls
   * @usage In template : c['lastname']
   * instead of stagiaireForm.controls['lastname']
   */
public get c(): {[key: string]: AbstractControl} {
  return this.stagiaireForm.controls;
}
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("Le onSubmit a fonctionné : ");
    console.log(this.stagiaireForm.value);    // Cela marche avec un string et une virgule (pas de +)
    /*
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName(this.stagiaireForm.value.lastName);
    stagiaire.setFirstName(this.stagiaireForm.value.firstName);
    stagiaire.setEmail(this.stagiaireForm.value.email);
    stagiaire.setPhoneNumber(this.stagiaireForm.value.phoneNumber);
    //stagiaire.setBirthDate(new Date (this.stagiaireForm.value.birthDate));
    if (this.stagiaireForm.value.birthDate != null) {
      stagiaire.setBirthDate(new Date(this.stagiaireForm.value.birthDate))
    }
    this.stagiaireService.add(stagiaire);
    console.log(stagiaire);*/

    console.log("Delegate add stagiaire:", this.stagiaireForm.value);
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);
    this.stagiaireService.add(dto)
    .subscribe(() => {
      this.goHome();
    });
  }

  public goHome(): void {
    this.router.navigate(['/', 'home']);
  }
}
