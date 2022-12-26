import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onChangeCategory(event: any, role: any) {
    this.selectedRoles.push(role.value);
  }

  doSignup() {
    if (this.userName !== '' && this.userName !== null && this.userPass !== '' && this.userPass !== null
      && this.selectedRoles.length > 0) {
      const request: RequestDto = {
        userName: this.userName, userPass: this.userPass, roles: this.selectedRoles
      };
      this.authService.signup(request).subscribe(
        (result) => { this.success = result; },
        (error) => { this.error = 'Something went wrong during signup'; }
      );
    } else {
      this.error = 'All fields are mandatory';
    }
  }
}