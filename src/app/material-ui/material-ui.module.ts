import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Forms UI
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Exercice du Datepicker :
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ... MaterialUiModule.materialModules // ... SPREAD OPERATOR (il permet de copier facilement un tableau ou un objet)
  ]
})
export class MaterialUiModule { 
  public static materialModules = [
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatIconModule,
// Exportation du DatepickerModule depuis le MaterialUiModule :
MatDatepickerModule
  ]
}
