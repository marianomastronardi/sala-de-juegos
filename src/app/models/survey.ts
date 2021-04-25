export class Survey{
    nombre:string;
    apellido:string;
    edad:number;
    telefono:string;
    email:string;
    mostEnjoyed:string;
    review:string;
    level:string;
    improves:any;

    constructor(){
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.telefono = '';
    this.email = '';
    this.mostEnjoyed = '';
    this.review = '';
    this.level = '';
    this.improves = {};
    }
}