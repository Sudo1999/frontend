export class Poe {

    private id: number = 0;
    private title: string = "";
    private beginDate!: Date;
    private endDate!: Date;
    private poeType: string = "";
    private idAelion: string = "";

    /*
1. "En tant qu'utilisateur, je souhaite visualiser la liste des POE afin de pouvoir accéder aux options
     de modification / suppression".
2. "En tant qu'utilisateur, je souhaite disposer d'un bouton me permettant d'ajouter une POE".
3. "En tant qu'utilisateur, je souhaite pouvoir filtrer les POE selon qu'elles sont passées d'un mois, 6 mois ou un an,
     afin d'accéder à l'option d'envoi des emails".     

4. "En tant qu'utilisateur je dois pouvoir créer une nouvelle POE afin de préparer mon planning d'envoi".
     Critères d'acceptation : la date de début de la POE ne peut être supérieure à la date de fin.
5. "En tant qu'utilisateur, je dois pouvoir modifier une POE afin de corriger d'éventuelles erreurs".
     Critères d'acceptation : la date de début de la POE ne peut être supérieure à la date de fin.
6. "En tant qu'utilisateur, je dois pouvoir supprimer une POE afin de conserver une liste cohérente".
    */

    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
    
    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string): void {
        this.title = title;
    }

    public getBeginDate(): Date {
        return this.beginDate;
    }
    public setBeginDate(beginDate: Date): void {
        this.beginDate = beginDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }
    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getPoeType():string {
        return this.poeType;
    }
    public setPoeType(poeType: string): void {
        this.poeType = poeType;
    }

    public getIdAelion(): string {
        return this.idAelion;
    }
    public setIdAelion(idAelion: string): void {
        this.idAelion = idAelion;
    }    
}
