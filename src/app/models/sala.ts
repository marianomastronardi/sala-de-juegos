import { Jugador } from "./jugador";

export class Sala {
    nombreJuego: string;
    player: any;
    bot: any;
    finalizado: boolean;
    resultado: string;
    tabla: any; //solo para TTT
    tablaMemo: any; //solo para Memotest
    startDate: string;

    constructor() {
        let date_ob = new Date();
    
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
    
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
        // current year
        let year = date_ob.getFullYear();
    
        // current hours
        let hours = date_ob.getHours();
    
        // current minutes
        let minutes = date_ob.getMinutes();
    
        // current seconds
        let seconds = date_ob.getSeconds();

        this.nombreJuego = '';
        this.player = {};
        this.bot = {};        
        this.finalizado = false;
        this.resultado = '';
        this.tabla = {};
        this.tablaMemo = {};
        this.startDate = date + "/" + month + "/" + year + " " + ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    }
}


