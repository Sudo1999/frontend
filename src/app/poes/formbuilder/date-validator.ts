import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class DateValidator {

    constructor() { }

    public static dateOrderValidator(control: AbstractControl): ValidationErrors | null {

        if (control.get('beginDate') !== null && control.get('endDate') !== null) {

            // Comparaison des champs
            const begin = control.get('beginDate')!.value;
            const end = control.get('endDate')!.value;

            if (begin !== null && end !== null) {
                const isValid = begin.isBefore(end);

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
