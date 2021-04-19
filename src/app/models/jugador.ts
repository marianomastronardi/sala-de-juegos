export class Jugador {
    email: string;
    salaActual: string;
    estadoJugada: boolean;
    opcion: string;
    puntosSesion: number;
    x: boolean;
    o: boolean;

    constructor() {
        this.email = '';
        this.salaActual = '';
        this.estadoJugada = false;
        this.opcion = '';
        this.puntosSesion = 0;
        this.x = false;
        this.o = false;
    }
}
