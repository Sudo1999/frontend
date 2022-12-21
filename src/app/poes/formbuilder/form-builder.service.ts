import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Poe } from 'src/app/core/models/poe';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {   // FormBuilderService du package poes

  private form!: FormGroup;
  private poe: Poe = new Poe();
  private updateMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string
  ) { 
    this.locale = 'fr';
    this.adapter.setLocale(this.locale);
  }

  public getForm(): FormGroup {
    return this.form;
  }

  public build(poe: Poe): FormBuilderService {

    this.poe = poe;
    if (this.poe.getId() != 0) {
      this.updateMode = true;
    }

    this.form = this.formBuilder.group({
      title: [
        this.poe.getTitle(),
        // [
        //   Validators.required
        // ]
      ],
      poeType: [
        this.poe.getPoeType(),
        // [
        //   Validators.required
        // ]
      ],
      beginDate: [
        this.poe.getBeginDate(),
        // [
        //   Validators.required
        //   Validators ? => La date de début de la POE ne peut être supérieure à la date de fin.
        // ]
      ],
      endDate: [
        this.poe.getEndDate(),
        // [
        //   Validators.required
        //   Validators ? => La date de début de la POE ne peut être supérieure à la date de fin.
        // ]
      ],
      idAelion: [
        this.poe.getIdAelion()
      ]
    });
    
    if (this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.poe.getId());
      this.form.addControl('id', idControl);
    }
    return this; // To chain methods
  }
}
