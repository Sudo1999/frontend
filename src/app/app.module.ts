import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireFilterComponent } from './stagiaires/components/stagiaire-filter/stagiaire-filter.component';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { BubbleDirective } from './shared/directives/bubble.directive';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AppInitializerService } from './core/services/app-initializer.service';
import { PoeWelcomeComponent } from './poes/components/poe-welcome/poe-welcome.component';
import { PoeFormComponent } from './poes/components/poe-form/poe-form.component';
import { PoeFilterComponent } from './poes/components/poe-filter/poe-filter.component';

// function initializeApp(): Promise<any> {
//   return new Promise((resolve, reject) => {
//     // Do some asynchronous stuff
//     //resolve();
//   });
// }

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
    StagiaireFormComponent,
    PoeWelcomeComponent,
    PoeFormComponent,
    PoeFilterComponent
  ],
  imports: [
    BrowserModule,
    //HttpClientModule,
    AppRoutingModule,
    //ReactiveFormsModule,
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
    }
  ],
  bootstrap: [AppComponent]   // AppModule appelle AppComponent (app.component.ts)
})
export class AppModule { }
