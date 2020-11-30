export class Login {
    public email;
    public password;

    constructor(login: Login = {} as any) {
        this.email = login.email || '';
        this.password = login.password || '';
    }
}
