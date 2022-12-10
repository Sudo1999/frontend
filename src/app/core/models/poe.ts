export class Poe {

    private id: number = 0;
    private title: string = "";
    private beginDate!: Date;
    private endDate!: Date;
    private poeType: string = "";
    private idAelion: string = "";

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
