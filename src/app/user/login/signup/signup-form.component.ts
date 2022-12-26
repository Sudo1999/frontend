import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestDto } from '../../dto/request-dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  public userName: string = '';    // Correspond au userName de RequestDto
  public userPass: string = '';   // Correspond au userPass de RequestDto
  public roles: any = [   // Correspond au roles de RequestDto
    { name: 'User', value: 'ROLE_USER', selected: false },
    { name: 'Admin', value: 'ROLE_ADMIN', selected: false },
    { name: 'Anonymous', value: 'ROLE_ANONYMOUS', selected: false },
  ]
  public selectedRoles: string[] = [];
  public error: string = '';
  public success: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onChangeCategory(event: any, role: any) {
    console.log("In onChangeCategory in signup form, selectedRoles = " + this.selectedRoles.length);
    console.log(role.value);
    console.log(event.target.checked);
    if (event.target.checked === true) {
      this.selectedRoles.push(role.value);
      console.log('After push, ' + this.selectedRoles.length);
    } else {
      const reducTab = this.selectedRoles.filter(element => element !== role.value);
      this.selectedRoles = reducTab;
      console.log('After filter, ' + this.selectedRoles.length);
    }
  }

  doSignup() {
    if (this.userName !== '' && this.userName !== null && this.userPass !== '' && this.userPass !== null
        && this.selectedRoles.length > 0) {
      const request: RequestDto = {
        userName: this.userName, userPass: this.userPass, roles: this.selectedRoles
      };
      this.authService.signup(request).subscribe(
        (result) => {
          this.success = result;
          this.router.navigateByUrl('entrance');
        },
        (error) => {
          this.error = 'Something went wrong during signup';
        }
      );
    } else {
      this.error = 'All fields are mandatory';
    }
  }
}