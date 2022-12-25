import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SigninFormComponent } from './login/signin-form/signin-form.component'
import { SignupFormComponent } from './login/signup-form/signup-form.component';

@NgModule({
  declarations: [
    SigninFormComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
