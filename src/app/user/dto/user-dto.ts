export class UserDto {
    public id?: number;
    public login: string = '';
    public password: string = '';   // Ici on peut mettre le password parce que l'information sera volatile
    public stayConnected?: boolean = false;

    // public formDeserialize(formData: any): void {
    //     this.login = formData.userLogin;
    //     this.password = formData.userPassword;
    //     this.stayConnected = formData.stayConnected;
    // }
}
