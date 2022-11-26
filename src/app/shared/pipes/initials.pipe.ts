import { Pipe, PipeTransform } from '@angular/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { VariantType } from './variant-type';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  private variant: any;

  transform(value: unknown, ...args: unknown[]): unknown {  // ...args signifie qu'on peut passer un ou plusieurs paramètres

    // Y a-t-il d'autres paramètres passés ?
    /*
    if (args.length) {
      console.log(`Paramètres : ${args[0]}`);   // args est un tableau et peut être manipulé en tant que tel
    }*/

    // On veut afficher les initiales des stagiaires :

    if (value instanceof Stagiaire) {
      this.variant = args[0]; // Get the object at index 0 => initialsOrder (can be undefined)
      return this.getInitials(value, args).toUpperCase();
    } else {
      throw new Error('Value is not a valid Stagiaire object');
    }
    return 'Hello Initials pipe';   // La ligne n'est plus jamais accédée
  }

  private getInitials(stagiaire: Stagiaire, thisargs: unknown[]): string {
    // Dans thisargs on a ce qui est passé comme paramètre dans le pipe

    if (this.variant !== undefined && this.variant.initialsOrder === false) {
      return this.lastNameFirst(stagiaire);   // Si initialsOrder a été défini false
    }
    return this.firstNameFirst(stagiaire);    // Si initialsOrder n'a pas été défini ou a été défini true
  }

  private firstNameFirst(stagiaire: Stagiaire): string {
    return this.getFirstNameInitials(stagiaire) + stagiaire.getLastName().charAt(0);
  }

  private lastNameFirst(stagiaire: Stagiaire): string {
    return stagiaire.getLastName().charAt(0) + this.getFirstNameInitials(stagiaire);
  }

  // Pour traiter les cas des prénoms composés :
  private getFirstNameInitials(stagiaire: Stagiaire): string {
      const dashPosition: number = stagiaire.getFirstName().indexOf('-');
      if (dashPosition !== -1) {
        return stagiaire.getFirstName().charAt(0) + stagiaire.getFirstName().charAt(dashPosition + 1);
      } else {
      return stagiaire.getFirstName().charAt(0);
    }
  }
}