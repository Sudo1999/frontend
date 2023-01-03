import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireFilterComponent } from './stagiaires/components/stagiaire-filter/stagiaire-filter.component';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { BubbleDirective } from './shared/directives/bubble.directive';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AppInitializerService } from './core/services/app-initializer.service';
import { PoeWelcomeComponent } from './poes/components/poe-welcome/poe-welcome.component';
import { PoeFormComponent } from './poes/components/poe-form/poe-form.component';
import { PoeFilterComponent } from './poes/components/poe-filter/poe-filter.component';
import { SignupFormComponent } from './user/login/signup/signup-form.component';
import { SigninFormComponent } from './user/login/signin/signin-form.component';
import { HttpInterceptorService } from './user/services/http-interceptor.service';
import { MatSelectModule } from '@angular/material/select';

export function initializeApp(appInitService: AppInitializerService) {
  return (): Promise<any> => {
    return appInitService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    StagiaireTableComponent,
    StagiaireFilterComponent,
    StagiaireDetailComponent,
    StagiaireFormComponent,
    InitialsPipe,
    BubbleDirective,
    PoeWelcomeComponent,
    PoeFormComponent,
    PoeFilterComponent,
    //SignupFormComponent,  // L'ajout de ces deux modules provoque une erreur sur UserModule :
    //SigninFormComponent   // => The Component 'Sign..FormComponent' is declared by more than one NgModule.
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule
  ],
  providers: [
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]   // AppModule appelle AppComponent (app.component.ts)
})
export class AppModule { }
