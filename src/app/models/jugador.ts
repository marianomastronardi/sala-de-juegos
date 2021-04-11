export class Jugador {
    email: string;
    salaActual: string;
    estadoJugada: boolean;
    opcion:string;
    puntosSesion:number;

    constructor() {
        this.email = '';
        this.salaActual = '';
        this.estadoJugada = false;
        this.opcion = '';
        this.puntosSesion = 0;
    }
}
