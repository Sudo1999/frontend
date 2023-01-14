import { Stagiaire } from "src/app/core/models/stagiaire";
import { PoeDto } from "./poe-dto";

//export class PoeFullDto extends PoeDto {
export class PoeFullDto {

    // La construction de la classe n'est pas correcte, il faudra l'hériter et supprimer tous les attributs communs :
    public id?: number;
    public title: string = '';
    public beginDate!: Date;
    public endDate!: Date;
    public poeType: string = '';
    public idAelion: string = '';

    public stagiaires!: Array<Stagiaire>;

    public constructor(formValues: any) {
        Object.assign(this, formValues);
    }
}
