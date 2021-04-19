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
  sala: Sala;
  listaSalas: Sala[] = [];
  soyJugador1: boolean = false;
  jugador1!: Jugador;
  jugador2!: Jugador;
  listPlayers: Jugador[] = [];
  juego: string = 'PiedraPapelOTijera';
  docID: string = '';
  private searchEventSubscription: Subscription = new Subscription();

  constructor(private route: Router,
    private _authService: AuthService,
    private _salaService: SalaService) {
    this.sala = new Sala();
    this.init();
  }

  ngOnInit(): void {

  }

  init() {
    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    } else {
      this.searchEventSubscription =
        this._salaService.getSalaPorJuego(this.juego)
          .snapshotChanges()
          .pipe(
            map(changes =>
              changes.map((c: any) => {
                console.log('c', c)
                this.docID = c.payload.doc.id;
                return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
              }
              )
            )
          )
          .subscribe((doc: any) => {
            console.log('doc', doc)
            this.listaSalas = (doc) ? doc : [];

            if (this.listaSalas.length == 0) {
              this.sala = new Sala();
              this.sala.nombreJuego = this.juego;
              this.sala.ready = false;
              this.jugador1 = new Jugador();
              this.jugador1.email = this._authService.user.email;
              this.jugador1.estadoJugada = false;
              this.sala.id = uid();
              this.jugador1.salaActual = this.sala.id;
              this.listPlayers.push(this.jugador1);
              this.sala.jugador1 = JSON.stringify(this.listPlayers[0]);
              console.log('create', this.sala)
              this._salaService.create(this.sala);
              this.searchEventSubscription.unsubscribe()
              this.getMyRoom()
            } else {

              var oSala = this.listaSalas.find((value: Sala) => {
                this.jugador1 = JSON.parse(value.jugador1);
                return (!(this.jugador1.email == undefined || this.jugador1.email == null))
              })

              if (oSala != undefined && oSala != null && this._authService.user.email != this.jugador1.email) {
                this.sala = oSala;
                this.sala.ready = true;
                this.jugador2 = new Jugador();
                this.jugador2.email = this._authService.user.email;
                this.jugador2.estadoJugada = false;
                this.jugador2.salaActual = this.sala.id;
                this.listPlayers.push(this.jugador1);
                this.listPlayers.push(this.jugador2);
                this.sala.jugador1 = JSON.stringify(this.jugador1);
                this.sala.jugador2 = JSON.stringify(this.jugador2);
                console.log('sala', this.sala);
                this._salaService.update(this.docID, this.sala);
                this.setSala(this.sala)
                this.searchEventSubscription.unsubscribe()
                this.getMyRoom()
              }
            }
          }
          )
    }
  }

  getMyRoom() {
    this.searchEventSubscription =
      this._salaService.getMiSalaPorJuego(this.juego)
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map((c: any) => {
              this.docID = c.payload.doc.id;
              return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            }
            )
          )
        )
        .subscribe((doc: any) => {
          if (doc[0]) {
            this.sala.id = doc[0].id;
            this.sala.nombreJuego = doc[0].nombreJuego;
            this.sala.ready = doc[0].ready;
            this.sala.finalizado = doc[0].finalizado;
            this.sala.jugador1 = doc[0].jugador1;
            this.sala.jugador2 = doc[0].jugador2;
            this.jugador1 = new Jugador();
            this.jugador2 = new Jugador();
            this.jugador1 = JSON.parse(doc[0].jugador1);
            this.jugador2 = JSON.parse(doc[0].jugador2);
          }
        }
        )
  }

  setSala(oSala: Sala) {
    this.sala = oSala;
  }

  setearJugada(opcion: string) {
    if (this._authService.user.email == this.jugador1.email) {
      //jugador 1
      this.jugador1.opcion = opcion;
      this.jugador1.estadoJugada = true;
      this.sala.jugador1 = JSON.stringify(this.jugador1);
      this.soyJugador1 = true;
    } else {
      //jugador 2
      this.jugador2.opcion = opcion;
      this.jugador2.estadoJugada = true;
      this.sala.jugador2 = JSON.stringify(this.jugador2);
    }

    if (this.jugador1.estadoJugada && this.jugador2.estadoJugada) {
      this.setResultado();
      this.sala.resultado = this.resultado;
      this.jugador1.estadoJugada = false;
      this.jugador2.estadoJugada = false;
      this.jugador1.opcion = '';
      this.jugador2.opcion = '';
      this.sala.jugador1 = JSON.stringify(this.jugador1);
      this.sala.jugador2 = JSON.stringify(this.jugador2);
    }

    this._salaService.update(this.docID, Object.assign({}, this.sala));

    setTimeout(() => {
      this.sala.resultado = '';
    }, 2000);

    if (this.jugador1.puntosSesion == 3 || this.jugador2.puntosSesion == 3) {
      this.resultado = (this.jugador1.puntosSesion == 3 ? this.jugador1.email : this.jugador2.email) + ' ganó el juego!!';
      this.sala.resultado = this.resultado;
      this.sala.finalizado = true;
      this._salaService.update(this.docID, Object.assign({}, this.sala));
      this.searchEventSubscription.unsubscribe();
      
      setTimeout(() => {
        this.resultado = '';
        this.sala.resultado = this.resultado;
        this.route.navigate(['home'])
      }, 2000);
    }
  }

  setResultado() {

    switch (this.jugador1.opcion) {
      case 'piedra':
        switch (this.jugador2.opcion) {
          case 'piedra':
            this.resultado = 'Empate!!'
            break;
          case 'papel':
            this.resultado = this.jugador2.email + ' gana!!'
            this.jugador2.puntosSesion += 1;
            break;
          case 'tijera':
            this.resultado = this.jugador1.email + ' gana!!'
            this.jugador1.puntosSesion += 1;
            break;
          default:
            break;
        }
        break;
      case 'papel':
        switch (this.jugador2.opcion) {
          case 'piedra':
            this.resultado = this.jugador1.email + ' gana!!'
            this.jugador1.puntosSesion += 1;
            break;
          case 'papel':
            this.resultado = 'Empate!!'
            break;
          case 'tijera':
            this.resultado = this.jugador2.email + ' gana!!'
            this.jugador2.puntosSesion += 1;
            break;
          default:
            break;
        }
        break;
      case 'tijera':
        switch (this.jugador2.opcion) {
          case 'piedra':
            this.resultado = this.jugador2.email + ' gana!!'
            this.jugador2.puntosSesion += 1;
            break;
          case 'papel':
            this.resultado = this.jugador1.email + ' gana!!'
            this.jugador1.puntosSesion += 1;
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
