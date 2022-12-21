import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoeFormComponent } from './poes/components/poe-form/poe-form.component';
import { PoeWelcomeComponent } from './poes/components/poe-welcome/poe-welcome.component';
import { PoeResolver } from './poes/resolvers/poe.resolver';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';
import { HasUserGuard } from './user/guards/has-user.guard';
import { NoUserGuard } from './user/guards/no-user.guard';
import { LoginFormComponent } from './user/login/login-form/login-form.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      //redirectTo: 'login',  // Redirige vers un autre chemin, ici 'login' (précédemment 'home')
      redirectTo: 'home',
      pathMatch: 'full'   // Important pour que toute l'adresse soit lue
    },
    {
      path: 'login',
      component: LoginFormComponent,
      canActivate: [
        NoUserGuard
      ]
    },
    {
      path: 'home',
      component: StagiaireTableComponent,  // A la route 'home' correspond cette adresse
      // canActivate: [
      //   HasUserGuard
      // ]
    },
    {
      path: 'poe',
      component: PoeWelcomeComponent
    },
    {
      path: 'poe/add',
      component: PoeFormComponent,
      resolve: {canAcces: PoeResolver}  // canAcces était le premier type de PoeResolver
    },
    // {
    //   path: 'poe/:id',
    //   component: PoeDetailComponent
    // },
    {
      path: 'poe/update/:id',
      component: PoeFormComponent,
      resolve: {canAcces: PoeResolver}  // canAcces était le premier type de PoeResolver
    },
    {
      path: 'stagiaire',
      component: StagiaireTableComponent
    },
    {
      path: 'stagiaire/add',
      component: StagiaireFormComponent,
      resolve: {form: StagiaireResolver},
      // canActivate: [
      //   HasUserGuard
      // ]
    },
    {
      path: 'stagiaire/:id',    // Paramètre de la route => le ":"
      component: StagiaireDetailComponent,
      // canActivate: [
      //   HasUserGuard
      // ]
    },
    {
      path: 'stagiaire/update/:id',   // Paramètre de la route => le ":"
      component: StagiaireFormComponent,
      resolve: {form: StagiaireResolver},
      // canActivate: [
      //   HasUserGuard
      // ]
    },
    {
      path: '**',   // Wild card : Impérativement la dernière route du routeur
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]
 }
