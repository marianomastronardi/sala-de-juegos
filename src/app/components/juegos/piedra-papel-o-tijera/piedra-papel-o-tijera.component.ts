import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SalaService } from "../../../services/sala.service";
import { Sala } from '../../../models/sala';
import { Jugador } from 'src/app/models/jugador';
import { uid } from 'uid';
import { map } from "rxjs/operators";
import { ViewFlags } from '@angular/compiler/src/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-piedra-papel-o-tijera',
  templateUrl: './piedra-papel-o-tijera.component.html',
  styles: ['./piedra-papel-o-tijera.component.css']
})
export class PiedraPapelOTijeraComponent implements OnInit {

  resultado: string = '';
  sala!: Sala;
  player: Jugador = new Jugador();
  bot: Jugador = new Jugador();
  docID!: string;

  constructor(private route: Router,
    private _authService: AuthService,
    private _salaService: SalaService) {
  }

  ngOnInit(): void {
    this.sala = new Sala();
    this.sala.nombreJuego = 'PiedraPapelOTijera';
    this.player.email = this._authService.user.email;
    this.player.estado = true;
    this.sala.player = JSON.stringify(this.player);
    this.sala.bot = JSON.stringify(this.bot);

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
            if (!this.bot.chosen && this.bot.estado) this.setJugadaBot();
          })
      })

    }

  }

  setJugadaBot() {
    let o = Math.floor(Math.random() * 3) + 1;
    this.setearJugada((o == 1) ? 'piedra' : (o == 2) ? 'papel' : 'tijera');
  }

  setearJugada(opcion: string) {
    if (this.player.estado) {
      this.player.opcion = opcion;
      this.player.chosen = true;
    } else {
      this.bot.opcion = opcion;
      this.bot.chosen = true;
    }

    this.player.estado = !this.player.estado;
    this.bot.estado = !this.bot.estado;
    this.sala.bot = JSON.stringify(this.bot);
    this.sala.player = JSON.stringify(this.player);

    if (this.player.chosen && this.bot.chosen) {
      this.setResultado();
      this.player.opcion = '';
      this.bot.opcion = '';
      this.player.chosen = false;
      this.bot.chosen = false;

      if (this.player.puntosSesion == 3) {
        this.player.score = Math.round(Math.abs((new Date().getTime() - new Date(this.sala.startDate).getTime()) / 1000));
      }

      this.sala.player = JSON.stringify(this.player);
      this.sala.bot = JSON.stringify(this.bot);
      this._salaService.update(this.docID, Object.assign({}, this.sala));
      setTimeout(() => {
        this.resultado = '';
        this.sala.resultado = this.resultado;
        this._salaService.update(this.docID, Object.assign({}, this.sala));
      }, 2000);
    }

    if (this.player.puntosSesion == 3 || this.bot.puntosSesion == 3) {
      this.resultado = (this.player.puntosSesion == 3 ? this.player.email : 'Bot') + ' ha ganado el juego!!';
      this.sala.finalizado = true;

      setTimeout(() => {
        this.resultado = '';
        this.sala.resultado = this.resultado;
        this.route.navigate(['home'])
      }, 2000);
    }
    this._salaService.update(this.docID, Object.assign({}, this.sala));


  }

  setResultado() {

    switch (this.player.opcion) {
      case 'piedra':
        switch (this.bot.opcion) {
          case 'piedra':
            this.resultado = 'Empate!!'
            break;
          case 'papel':
            this.resultado = 'Perdiste!!'
            this.bot.puntosSesion++;
            break;
          case 'tijera':
            this.resultado = 'Ganaste!!'
            this.player.puntosSesion++;
            break;
          default:
            break;
        }
        break;
      case 'papel':
        switch (this.bot.opcion) {
          case 'piedra':
            this.resultado = 'Ganaste!!'
            this.player.puntosSesion++;
            break;
          case 'papel':
            this.resultado = 'Empate!!'
            break;
          case 'tijera':
            this.resultado = 'Perdiste!!'
            this.bot.puntosSesion++;
            break;
          default:
            break;
        }
        break;
      case 'tijera':
        switch (this.bot.opcion) {
          case 'piedra':
            this.resultado = 'Perdiste!!'
            this.bot.puntosSesion++;
            break;
          case 'papel':
            this.resultado = 'Ganaste!!'
            this.player.puntosSesion++;
            break;
          case 'tijera':
            this.resultado = 'Empate!!'
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    this.sala.resultado = this.resultado;
  }

}
