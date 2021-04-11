export class Usuario {
    uid:string;
    email: string;
    password: string;
    token?: string;

    constructor() {
        this.uid = '';
        this.email = '';
        this.password = '';
        this.token = undefined;
    }

    public static setToken(token:string):void{
        localStorage.setItem('token', token);
    }

    public static getToken():string | undefined{
        return localStorage.getItem('token')?.toString();
    }

    public static clearToken():void{
        localStorage.clear();
    }

}
