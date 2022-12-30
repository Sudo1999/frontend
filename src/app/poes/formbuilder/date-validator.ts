import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class DateValidator {

    private static begin: Date;
    private static end: Date;

    constructor() {}

    public static dateOrderValidator(control: AbstractControl): ValidationErrors | null {

        if (control.get('beginDate') !== null && control.get('endDate') !== null) {

            // Comparaison des champs            
            DateValidator.begin = control.get('beginDate')!.value;
            DateValidator.end = control.get('endDate')!.value;

            if (DateValidator.begin !== null && DateValidator.end !== null) {
                const isValid = DateValidator.begin < DateValidator.end;

                // Invalide
                if (!isValid) {
                    return { invalidEndDate: true };    // La validation fonctionne mais pas le message d'erreur
                }
                // Valide ou sans objet
                return null;
            }
            // Sans objet
            return null;
        }
        // Sans objet
        return null;
    }
}
