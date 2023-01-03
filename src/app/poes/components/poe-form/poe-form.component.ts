import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';
import { PoeDto } from '../../dto/poe-dto';
import { FormBuilderService } from '../../formbuilder/form-builder.service';
import {ErrorStateMatcher} from '@angular/material/core';

/* Error when invalid control is dirty (modified), touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-poe-form',
  templateUrl: './poe-form.component.html',
  styleUrls: ['./poe-form.component.scss']
})
export class PoeFormComponent implements OnInit {

  public poeForm!: FormGroup;
  public poeTypes: string[] = [];
  public selectedValue: string = '';
  public addMode: boolean = true;

  /* Select with a custom ErrorStateMatcher */
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  nativeSelectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private poeService: PoeService,
    private formBuilderService: FormBuilderService
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    this.poeForm = data.form;
    console.log(`${this.poeForm instanceof FormGroup ? 'poeForm OK' : 'poeForm KO'}`);

    this.route.url    // Observable
      .subscribe((url: UrlSegment[]) => {
        // Suis-je en mode update ou add ?
        console.log(url);
        console.log(url.filter((urlSegment: UrlSegment) => urlSegment.path === 'update').length);
        if (url.filter((urlSegment: UrlSegment) => urlSegment.path === 'update').length) {
          // Si le tableau n'est pas vide, length n'est pas nul => on a un update
          console.log('Mode update');
          this.addMode = false;
          // On récupère le id de la POE :
          this.poeService.findOne(parseInt(url[url.length - 1].path))
            .subscribe((poe: Poe) => {
              console.log(`Got ${poe.getId()} ready to update`);
              this.poeForm = this.formBuilderService.build(poe).getForm();
            });
        } else {
          console.log('Mode add');
        }
      });

      //this.poeTypes.push("Catégorie de POE");
      for(var type of this.poeService.getAllPoeTypes()) {
        this.poeTypes.push(type);
      }
  }

  // Usage => c['title'] instead of poeForm.controls['title'] in the form
  public get c(): { [key: string]: AbstractControl } {
    return this.poeForm.controls;
  }

  public onSubmit(): void {
    console.log("Le onSubmit a fonctionné : ");
    console.log(this.poeForm.value);

    const poeDto: PoeDto = new PoeDto(this.poeForm.value);
    let subscription: Observable<any>;
    if (this.addMode) {
      subscription = this.poeService.add(poeDto);
    } else {
      subscription = this.poeService.update(this.poeForm.value)
    }
    subscription.subscribe(() => this.goList());
  }

  public goList(): void {
    this.router.navigate(['/', 'poe']);
  }
}
