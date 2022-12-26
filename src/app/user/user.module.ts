import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SignupFormComponent } from './login/signup/signup-form.component';
import { SigninFormComponent } from './login/signin/signin-form.component';
import { EntranceComponent } from './login/entrance/entrance.component';

@NgModule({
  declarations: [
    SignupFormComponent,
    SigninFormComponent,
    EntranceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class UserModule { }
