import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { RequestDto } from '../../dto/request-dto';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit, OnDestroy {

  public signinForm!: FormGroup;
  public subscription!: Subscription;
  public isSignedin!: boolean;      // Correspond au isUserSignedin() du authService
  public userName: string = '';     // Correspond au userName de RequestDto
	public userPass : string = '';    // Correspond au userPass de RequestDto
  public error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
   
    this.isSignedin = this.authService.isUserSignedin();
		if(this.isSignedin) {
			this.router.navigateByUrl('home');
		}
    
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

  // Login de l'authentification via le userService
  public doLogin(): void {
    this.subscription = this.userService.login(this.signinForm.value)
    .subscribe((authenticated: boolean) => {
      if (authenticated) {
        this.router.navigate(['/', 'entrance']);
      } else {
        this.signinForm.reset();
      }
    })
  }

  // Login de l'authentification via le authService
  public doSignin() {
		if(this.userName !== '' && this.userName !== null && this.userPass !== '' && this.userPass !== null) {

			const request: RequestDto = { userName: this.userName, userPass: this.userPass};
			this.authService.signin(request).subscribe((result)=> {
        // Pour pouvoir utiliser le guard, this.userService.hasUser().getValue() doit être vrai dans HasUserGuard :
        this.doLogin();
				this.router.navigateByUrl('entrance');
			}, () => {
				this.error = 'Either invalid credentials or something went wrong';
			});
		} else {
			this.error = 'Invalid Credentials';
		}
	}
}
