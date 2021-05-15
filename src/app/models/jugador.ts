export class Jugador {
    email: string;
    estado: boolean;
    puntosSesion: number;
    opcion: string; //solo para PPT
    chosen: boolean; //solo para PPT
    x: boolean; //solo para TTT
    o: boolean; //solo para TTT
    score:number;

    constructor() {
        this.email = '';
        this.estado = false;
        this.puntosSesion = 0;
        this.opcion = '';        
        this.chosen = false;
        this.x = false;
        this.o = false;
        this.score = 0;
    }
}
