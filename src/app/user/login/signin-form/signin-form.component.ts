import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit, OnDestroy {

  public signinForm!: FormGroup;
  private subscription!: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      userLogin: [
        '',
        [
          Validators.required
        ]
      ],
      userPassword: [
        '',
        [
          Validators.required
        ]
      ],
      stayConnected: [
        false
      ]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  public onLogin(): void {
    //this.userService.login(this.loginForm.value)
    this.subscription = this.userService.login(this.signinForm.value)
    .subscribe((authenticated: boolean) => {
      if (authenticated) {
        this.router.navigate(['/', 'home']);
      } else {
        this.signinForm.reset();
      }
    })
  }
}
