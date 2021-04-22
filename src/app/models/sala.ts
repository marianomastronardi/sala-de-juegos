import { Jugador } from "./jugador";

export class Sala extends Jugador {
    id: string;
    nombreJuego: string;
    jugador1: string;
    jugador2: string;
    ready: boolean;
    finalizado: boolean;
    resultado: string;
    chosen: boolean;
    tabla: any;
    tablaMemo: any;

    constructor() {
        super();
        this.id = '';
        this.jugador1 = '';
        this.jugador2 = '';
        this.nombreJuego = '';
        this.ready = false;
        this.finalizado = false;
        this.resultado = '';
        this.chosen = false;
        this.tabla = {};
        this.tablaMemo = {};
    }
}


