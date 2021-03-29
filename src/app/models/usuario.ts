export class Usuario {
    email: string;
    password: string;

    constructor() {
        this.email = '';
        this.password = '';
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
