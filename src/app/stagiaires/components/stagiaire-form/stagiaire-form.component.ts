import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';

@Component({
  selector: 'app-stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.scss']
})
export class StagiaireFormComponent implements OnInit {

  stagiaire: Stagiaire = new Stagiaire();

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

  stagiaireForm: FormGroup = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$")),
    //birthDate: new FormControl(new Date())
    birthDate: new FormControl('')
  });

  constructor( 
    private stagiaireService: StagiaireService  // Injection de dépendance
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("Le onSubmit a fonctionné : ");
    console.log(this.stagiaireForm.value);    // Cela marche avec un string et une virgule (pas de +)

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
    console.log(stagiaire);
  }
}
