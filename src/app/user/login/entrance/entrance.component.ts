import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GreetingService } from '../../services/greeting.service';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss']
})
export class EntranceComponent implements OnInit {  // L'utilisateur arrive à cette page quand il s'identifie correctement

  isSignedin = false;
	signedinUser: string = '';
	greeting: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private greetingService: GreetingService
  ) { }

  ngOnInit(): void {

		this.isSignedin = this.authService.isUserSignedin();
		this.signedinUser = this.authService.getSignedinUser();

		if(!this.isSignedin) {    // On n'accède jamais à la page si l'on n'est pas authentifié
			this.router.navigateByUrl('signin');
		}

		if(this.isSignedin) {
			this.greetingService.getByUserRole().subscribe(
        (result: string) => this.greeting.push(result), () => console.log('/user - You are not authorized'));
			this.greetingService.getByAdminRole().subscribe(
        (result: string) => this.greeting.push(result), () => console.log('/admin - You are not authorized'));
			this.greetingService.getByUserOrAdminRole().subscribe(
        (result: string) => this.greeting.push(result), () => console.log('/userOrAdmin - You are not authorized'));
			this.greetingService.getByAnonymousRole().subscribe(
        (result: string) => this.greeting.push(result), () => console.log('/anonymous - You are not authorized'));
		}
  }

	doSignout() {
		this.authService.signout();
	}
}
