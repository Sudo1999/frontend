import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// Ajout pour le Datepicker :
// On aura souvent besoin du material-moment, c'est pourquoi on importe les modules et autres "tokens"
// qui en viennent dans le shared.module.ts
// La librairie material-moment offre une bonne souplesse dans la gestion des dates
import {
  MatMomentDateModule,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS
} from '@angular/material-moment-adapter';  // Pour le faire reconnaître => npm i @angular/material-moment-adapter@13
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import 'moment/locale/fr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [            // Modifications lors de l'ajout du material-ui
    MaterialUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Ajouts pour le Datepicker :
    MatMomentDateModule   // Fournissant la majorité des tokens et locales (langues)
  ],
  providers: [    // Services qui seront automatiquement gérés par Angular
    {
      provide: MAT_DATE_LOCALE, useValue: 'fr-FR'   // Langue française
    },
    {
      provide: DateAdapter,   // Classe pour adapter les dates (genre un adaptateur de prise AC/DC US vers des prises EU)
      useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE,
        MAT_MOMENT_DATE_ADAPTER_OPTIONS
      ]
    },
    {
      provide: MAT_DATE_FORMATS,    // Les différents formats de date à traiter le cas échéant
      useValue: MAT_MOMENT_DATE_FORMATS
    }
  ]
})
export class SharedModule { }
