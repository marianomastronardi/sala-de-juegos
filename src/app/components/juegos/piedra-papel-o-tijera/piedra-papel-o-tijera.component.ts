import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SalaService } from "../../../services/sala.service";
import { Sala } from '../../../models/sala';
import { Jugador } from 'src/app/models/jugador';

@Component({
  selector: 'app-piedra-papel-o-tijera',
  templateUrl: './piedra-papel-o-tijera.component.html',
  styles: ['./piedra-papel-o-tijera.component.css']
})
export class PiedraPapelOTijeraComponent implements OnInit {

  resultado: string = '';
  sala: Sala;
  listaSalas: Sala[] = [];
  soyJugador1: boolean = false;

  constructor(private route: Router,
    private _authService: AuthService,
    private _salaService: SalaService) {
    this.sala = new Sala();
  }

  ngOnInit(): void {
    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    } else {
      this._salaService.SalaRef
        .valueChanges()
        .subscribe((doc: Sala[]) => {
          this.listaSalas = doc.filter((value: Sala) => value.nombreJuego == 'PiedraPapelOTijera' && value.ready == false)
        })

      if (this.listaSalas.length == 0) {
        this.sala = new Sala();
        this.sala.nombreJuego = 'PiedraPapelOTijera';
        this.sala.ready = false;
        this.sala.jugador1 = new Jugador();
        this.sala.jugador1.email = this._authService.user.email;
        this.sala.jugador1.estadoJugada = false;
        this.sala.jugador1.salaActual = this.sala.id;
        console.log(this.sala)
        this._salaService.create(this.sala)
      } else {
        var oSala = this.listaSalas.find((value: Sala) => (!(value.jugador1.email == undefined || value.jugador1.email == null)))
        if (oSala != undefined && oSala != null) {
          this.sala = oSala;
          this.sala.ready = true;
          this.sala.jugador2 = new Jugador();
          this.sala.jugador2.email = this._authService.user.email;
          this.sala.jugador2.estadoJugada = false;
          this.sala.jugador2.salaActual = this.sala.id;
          console.log(this.sala)
          this._salaService.update(this.sala.id, this.sala);
        }
      }
    }
  }

  setearJugada(opcion: string) {
    if (this._authService.user.email == this.sala.jugador1.email) {
      //jugador 1
      this.sala.jugador1.opcion = opcion;
      this.sala.jugador1.estadoJugada = true;
      this.soyJugador1 = true;
    } else {
      //jugador 2
      this.sala.jugador2.opcion = opcion;
      this.sala.jugador2.estadoJugada = true;
    }
    this._salaService.update(this.sala.id, this.sala);

    if (this.sala.jugador1.estadoJugada && this.sala.jugador2.estadoJugada) {
      this.setResultado();
      this.sala.jugador1.estadoJugada = false;
      this.sala.jugador2.estadoJugada = false;
      this.sala.jugador1.opcion = '';
      this.sala.jugador2.opcion = '';

      if (this.sala.jugador1.puntosSesion == 3 || this.sala.jugador2.puntosSesion == 3) {
        setTimeout(() => {
          this.resultado = this.sala.jugador1.puntosSesion == 3 ? this.sala.jugador1.email : this.sala.jugador2.email + ' ganó el juego!!';
          this.sala.finalizado = true;
        }, 2000);

      this.resultado = '';
      }
    }
  }

  setResultado() {

    switch (this.sala.jugador1.opcion) {
      case 'piedra':
        switch (this.sala.jugador2.opcion) {
          case 'piedra':
            this.resultado = 'Empate!!'
            break;
          case 'papel':
            this.resultado = 'Jugador 2 gana!!'
            this.sala.jugador2.puntosSesion += 1;
            break;
          case 'tijera':
            this.resultado = 'Jugador 1 gana!!'
            this.sala.jugador1.puntosSesion += 1;
            break;
          default:
            break;
        }
        break;
      case 'papel':
        switch (this.sala.jugador2.opcion) {
          case 'piedra':
            this.resultado = 'Jugador 1 gana!!'
            this.sala.jugador1.puntosSesion += 1;
            break;
          case 'papel':
            this.resultado = 'Empate!!'
            break;
          case 'tijera':
            this.resultado = 'Jugador 2 gana!!'
            this.sala.jugador2.puntosSesion += 1;
            break;
          default:
            break;
        }
        break;
      case 'tijera':
        switch (this.sala.jugador2.opcion) {
          case 'piedra':
            this.resultado = 'Jugador 2 gana!!'
            this.sala.jugador2.puntosSesion += 1;
            break;
          case 'papel':
            this.resultado = 'Jugador 1 gana!!'
            this.sala.jugador1.puntosSesion += 1;
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
  }
}
