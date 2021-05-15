import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Jugador } from 'src/app/models/jugador';
import { Sala } from 'src/app/models/sala';
import { AuthService } from 'src/app/services/auth.service';
import { SalaService } from 'src/app/services/sala.service';
import { map } from "rxjs/operators";
import { uid } from 'uid';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styles: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

  tabla: any = {};
  resultado: string = '';
  sala!: Sala;
  player!: Jugador;
  bot!: Jugador;
  docID: string = '';
  habilitado: boolean = false;

  constructor(private _authService: AuthService,
    private _salaService: SalaService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.sala = new Sala();
    this.sala.nombreJuego = 'TaTeTi';
    this.player = new Jugador();
    this.bot = new Jugador();
    this.player.email = this._authService.user.email;
    this.player.estado = true;
    this.sala.player = JSON.stringify(this.player);
    this.sala.bot = JSON.stringify(this.bot);

    this.tabla.a1 = { x: false, o: false };
    this.tabla.a2 = { x: false, o: false };
    this.tabla.a3 = { x: false, o: false };
    this.tabla.b1 = { x: false, o: false };
    this.tabla.b2 = { x: false, o: false };
    this.tabla.b3 = { x: false, o: false };
    this.tabla.c1 = { x: false, o: false };
    this.tabla.c2 = { x: false, o: false };
    this.tabla.c3 = { x: false, o: false };

    this.sala.tabla = this.tabla;

    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    } else {
      this._salaService.create(this.sala).then((docRef) => {
        this.docID = docRef.id;
        this._salaService.getSalaById(this.docID)
          .valueChanges()
          .subscribe((doc: any) => {
            this.sala = doc;
            this.player = JSON.parse(this.sala.player);
            this.bot = JSON.parse(this.sala.bot);
            if (this.bot.estado && !this.sala.finalizado) this.setJugadaBot();
          })
      })
    }
  }

  setJugadaBot() {
    let cell = '';
    let verify = false;
    do {
      let option = Math.floor(Math.random() * 9) + 1;

      switch (option) {
        case 1:
          verify = this.bot.x ? this.tabla.a1.x : this.tabla.a1.o;
          cell = 'a1';
          break;
        case 2:
          verify = this.bot.x ? this.tabla.a2.x : this.tabla.a2.o;
          cell = 'a2';
          break;
        case 3:
          verify = this.bot.x ? this.tabla.a3.x : this.tabla.a3.o;
          cell = 'a3';
          break;
        case 4:
          verify = this.bot.x ? this.tabla.b1.x : this.tabla.b1.o;
          cell = 'b1';
          break;
        case 5:
          verify = this.bot.x ? this.tabla.b2.x : this.tabla.b2.o;
          cell = 'b2';
          break;
        case 6:
          verify = this.bot.x ? this.tabla.b3.x : this.tabla.b3.o;
          cell = 'b3';
          break;
        case 7:
          verify = this.bot.x ? this.tabla.c1.x : this.tabla.c1.o;
          cell = 'c1';
          break;
        case 8:
          verify = this.bot.x ? this.tabla.c2.x : this.tabla.c2.o;
          cell = 'c2';
          break;
        case 9:
          verify = this.bot.x ? this.tabla.c3.x : this.tabla.c3.o;
          cell = 'c3';
          break;
        default:
          break;
      }
    } while (verify);

    this.pulsar(cell);
  }

  elegirOpcion(opcion: string) {
    this.player = JSON.parse(this.sala.player);
    this.bot = JSON.parse(this.sala.bot);

    if (opcion == 'x') {
      this.player.x = true;
      this.bot.o = true;
      this.player.opcion = opcion;
      this.bot.opcion = 'o';
    } else {
      this.player.o = true;
      this.bot.x = true;
      this.player.opcion = opcion;
      this.bot.opcion = 'x';
    }

    this.player.chosen = true;
    this.sala.player = JSON.stringify(this.player);
    this.sala.bot = JSON.stringify(this.bot);
    this._salaService.update(this.docID, Object.assign({}, this.sala));
  }

  pulsar(celda: string) {
    this.player = JSON.parse(this.sala.player);
    this.bot = JSON.parse(this.sala.bot);
    switch (celda) {
      case 'a1':
        this.tabla.a1.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.a1.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'a2':
        this.tabla.a2.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.a2.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'a3':
        this.tabla.a3.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.a3.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'b1':
        this.tabla.b1.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.b1.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'b2':
        this.tabla.b2.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.b2.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'b3':
        this.tabla.b3.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.b3.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'c1':
        this.tabla.c1.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.c1.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'c2':
        this.tabla.c2.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.c2.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      case 'c3':
        this.tabla.c3.x = (this.player.estado) ? this.player.x : this.bot.x;
        this.tabla.c3.o = (this.player.estado) ? this.player.o : this.bot.o;
        break;
      default:
        break;
    }
    this.sala.tabla = this.tabla;
    this.sala.finalizado = this.checkResultado();
    if (this.sala.finalizado) {
      if (this.resultado = 'Ganaste') {
        this.player.score = Math.round(Math.abs((new Date().getTime() - new Date(this.sala.startDate).getTime()) / 1000));
      }
    }
    this.player.estado = !this.player.estado;
    this.bot.estado = !this.bot.estado;
    this.sala.player = JSON.stringify(this.player);
    this.sala.bot = JSON.stringify(this.bot);
    this._salaService.update(this.docID, Object.assign({}, this.sala));

    if (this.sala.finalizado) {
      setTimeout(() => {
        this.route.navigate(['/home']);
      }, 2000);
    }
  }

  checkResultado(): boolean {
    if (this.sala.tabla.a1.x && this.sala.tabla.a2.x && this.sala.tabla.a3.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.b1.x && this.sala.tabla.b2.x && this.sala.tabla.b3.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.c1.x && this.sala.tabla.c2.x && this.sala.tabla.c3.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a1.x && this.sala.tabla.b1.x && this.sala.tabla.c1.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a2.x && this.sala.tabla.b2.x && this.sala.tabla.c2.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a3.x && this.sala.tabla.b3.x && this.sala.tabla.c3.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a1.x && this.sala.tabla.b2.x && this.sala.tabla.c3.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a3.x && this.sala.tabla.b2.x && this.sala.tabla.c1.x) { this.resultado = (this.player.estado && this.player.x) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a1.o && this.sala.tabla.a2.o && this.sala.tabla.a3.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.b1.o && this.sala.tabla.b2.o && this.sala.tabla.b3.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.c1.o && this.sala.tabla.c2.o && this.sala.tabla.c3.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a1.o && this.sala.tabla.b1.o && this.sala.tabla.c1.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a2.o && this.sala.tabla.b2.o && this.sala.tabla.c2.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a3.o && this.sala.tabla.b3.o && this.sala.tabla.c3.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a1.o && this.sala.tabla.b2.o && this.sala.tabla.c3.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }
    if (this.sala.tabla.a3.o && this.sala.tabla.b2.o && this.sala.tabla.c1.o) { this.resultado = (this.player.estado && this.player.o) ? 'Ganaste' : 'Perdiste'; this.habilitado = false; this.player.estado = false; this.bot.estado = false; return true }

    return false;
  }
}
