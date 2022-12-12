import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login.form/login.form.component';



@NgModule({
  declarations: [
    Login.FormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
