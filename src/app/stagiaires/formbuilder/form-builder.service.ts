import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {   // FormBuilderService du package stagiaires

  private form!: FormGroup;
  private stagiaire: Stagiaire = new Stagiaire();
  private updateMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    // Ajouts pour le Datepicker, pour définir la langue à utiliser dans FormBuilderService :
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string
  ) {
    this.locale = 'fr';
    this.adapter.setLocale(this.locale);
  }

  public getForm(): FormGroup {
    return this.form;
  }

  public build(stagiaire: Stagiaire): FormBuilderService {
    // public build(...args: Stagiaire[]): FormBuilderService {
    // ...args => Zéro paramètre ou n paramètres stockés dans un tableau (ce n'est plus utile)
    // Si on le fait il faut modifier private stagiaire: Stagiaire = new Stagiaire();
    //   if (args.length)
    //     this.stagiaire = Object.assign(this.stagiaire, args[0]);
    //   else
    //     this.stagiaire = new Stagiaire();
    this.stagiaire = stagiaire;
    if (this.stagiaire.getId() != 0) {
      this.updateMode = true;
    }
    this.form = this.formBuilder.group({
      lastName: [
        this.stagiaire.getLastName(),
        [
          Validators.required
        ]
      ],
      firstName: [
        this.stagiaire.getFirstName(),
        [
          Validators.required
        ]
      ],
      email: [
        this.stagiaire.getEmail(),
        [
          Validators.required,
          Validators.email
        ]
      ],
      phoneNumber: [
        this.stagiaire.getPhoneNumber(),
        [
          Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
        ]
      ],
      birthDate: [
        this.stagiaire.getBirthDate() !== null ? this.stagiaire.getBirthDate() : ''
      ]
    });

    // Ajoute un contrôle avec la valeur id du Stagiaire
    // donc form.value vaudra {id: 1, ...}
    if (this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.stagiaire.getId());
      this.form.addControl('id', idControl);
    }
    return this; // To chain methods
  }  
}
