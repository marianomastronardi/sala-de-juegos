import { Jugador } from "./jugador";

export class Sala extends Jugador {
    id: string;
    nombreJuego: string;
    jugador1: Jugador;
    jugador2: Jugador;
    ready:boolean;
    finalizado:boolean;

    constructor() {
        super();
        this.id = '';
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.nombreJuego = '';
        this.ready = false;
        this.finalizado = false;
    }
}


