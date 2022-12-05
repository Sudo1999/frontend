import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'home',  // Redirige vers un autre chemain, ici 'home'
      pathMatch: 'full'   // Important pour que toute l'adresse soit lue
    },
    {
      path: 'home',
      component: StagiaireTableComponent  // A la route 'home' correspond cette adresse
    },
    {
      path: 'stagiaire/add',
      component: StagiaireFormComponent,
      resolve: {form: StagiaireResolver}
    },
    {
      path: 'stagiaire/:id',    // Paramètre de la route => le ":"
      component: StagiaireDetailComponent
    },
    {
      path: 'stagiaire/update/:id',
      component: StagiaireFormComponent,
      resolve: {form: StagiaireResolver}
    },
    {
      path: '**',   // Wild card : Impérativement la dernière route du routeur
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]
 }
