export class PoeDto {
    public id?: number;
    public title: string = '';
    public beginDate!: Date;
    public endDate!: Date;
    public poeType: string = '';
    public idAelion: string = '';

    public constructor(formValues: any) {
        Object.assign(this, formValues);
    }
}
