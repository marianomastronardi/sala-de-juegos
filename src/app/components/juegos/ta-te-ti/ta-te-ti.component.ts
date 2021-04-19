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
  juego: string = 'TaTeTi';
  resultado: string = '';
  sala: Sala;
  listaSalas: Sala[] = [];
  soyJugador1: boolean = false;
  jugador1!: Jugador;
  jugador2!: Jugador;
  listPlayers: Jugador[] = [];
  docID: string = '';
  habilitado:boolean = false;

  private searchEventSubscription: Subscription = new Subscription();

  constructor(private _authService: AuthService,
    private _salaService: SalaService,
    private route: Router) {
    this.sala = new Sala();
    this.init();
  }

  ngOnInit(): void {
    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    }
  }

  elegirOpcion(opcion: string) {
    this.jugador1 = JSON.parse(this.sala.jugador1);
    this.jugador2 = JSON.parse(this.sala.jugador2);
    console.log(this.jugador1)
    if (this._authService.user.email == this.jugador1.email) {
      this.jugador1.opcion = opcion
      if (opcion == 'x') {
        this.jugador1.x = true;
        this.jugador2.o = true;
      } else {
        this.jugador1.o = true;
        this.jugador2.x = true;
      }
    } else {
      this.jugador2.opcion = opcion
      if (opcion == 'x') {
        this.jugador1.o = true;
        this.jugador2.x = true;
      } else {
        this.jugador1.x = true;
        this.jugador2.o = true;
      }
    }
    this.sala.jugador1 = JSON.stringify(this.jugador1);
    this.sala.jugador2 = JSON.stringify(this.jugador2);
    this.sala.chosen = true;
    this._salaService.update(this.docID, Object.assign({}, this.sala));
  }

  pulsar(celda: string) {
    this.jugador1 = JSON.parse(this.sala.jugador1);
    this.jugador2 = JSON.parse(this.sala.jugador2);
    switch (celda) {
      case 'a1':
        this.tabla.a1.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.a1.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'a2':
        this.tabla.a2.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.a2.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'a3':
        this.tabla.a3.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.a3.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'b1':
        this.tabla.b1.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.b1.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'b2':
        this.tabla.b2.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.b2.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'b3':
        this.tabla.b3.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.b3.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'c1':
        this.tabla.c1.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.c1.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'c2':
        this.tabla.c2.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.c2.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      case 'c3':
        this.tabla.c3.x = (this._authService.user.email == this.jugador1.email) ? this.jugador1.x : this.jugador2.x;
        this.tabla.c3.o = (this._authService.user.email == this.jugador1.email) ? this.jugador1.o : this.jugador2.o;
        break;
      default:
        break;
    }
    this.sala.tabla = this.tabla;
    this.jugador1.estadoJugada = (this._authService.user.email == this.jugador1.email)
    this.jugador2.estadoJugada = (this._authService.user.email == this.jugador2.email)
    this.sala.finalizado = this.checkResultado();
    this.sala.jugador1 = JSON.stringify(this.jugador1);
    this.sala.jugador2 = JSON.stringify(this.jugador2);    
    this._salaService.update(this.docID, Object.assign({}, this.sala));
    
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

                this.tabla.a1 = {};
                this.tabla.a2 = {};
                this.tabla.a3 = {};
                this.tabla.b1 = {};
                this.tabla.b2 = {};
                this.tabla.b3 = {};
                this.tabla.c1 = {};
                this.tabla.c2 = {};
                this.tabla.c3 = {};

                this.tabla.a1 = {};
                this.tabla.a2 = {};
                this.tabla.a3 = {};
                this.tabla.b1 = {};
                this.tabla.b2 = {};
                this.tabla.b3 = {};
                this.tabla.c1 = {};
                this.tabla.c2 = {};
                this.tabla.c3 = {};

                this.tabla.a1.x = false;
                this.tabla.a2.x = false;
                this.tabla.a3.x = false;
                this.tabla.b1.x = false;
                this.tabla.b2.x = false;
                this.tabla.b3.x = false;
                this.tabla.c1.x = false;
                this.tabla.c2.x = false;
                this.tabla.c3.x = false;

                this.tabla.a1.o = false;
                this.tabla.a2.o = false;
                this.tabla.a3.o = false;
                this.tabla.b1.o = false;
                this.tabla.b2.o = false;
                this.tabla.b3.o = false;
                this.tabla.c1.o = false;
                this.tabla.c2.o = false;
                this.tabla.c3.o = false;

                this.sala.tabla = this.tabla;

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
            this.sala.chosen = doc[0].chosen;
            this.sala.tabla = doc[0].tabla;
            this.tabla = this.sala.tabla;
            this.jugador1 = new Jugador();
            this.jugador2 = new Jugador();
            this.jugador1 = JSON.parse(doc[0].jugador1);
            this.jugador2 = JSON.parse(doc[0].jugador2);
            this.habilitado = (this._authService.user.email == this.jugador1.email) ? this.jugador1.estadoJugada : this.jugador2.estadoJugada;
            
          }
        }
        )
  }

  setSala(oSala: Sala) {
    this.sala = oSala;
  }

  setearJugada(e: any) {
    if (this._authService.user.email == this.jugador1.email) {

    } else {

    }
  }

  checkResultado():boolean{
    if(this.sala.tabla.a1.x && this.sala.tabla.a2.x && this.sala.tabla.a3.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.b1.x && this.sala.tabla.b2.x && this.sala.tabla.b3.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.c1.x && this.sala.tabla.c2.x && this.sala.tabla.c3.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a1.x && this.sala.tabla.b1.x && this.sala.tabla.c1.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a2.x && this.sala.tabla.b2.x && this.sala.tabla.c2.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a3.x && this.sala.tabla.b3.x && this.sala.tabla.c3.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a1.x && this.sala.tabla.b2.x && this.sala.tabla.c3.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a3.x && this.sala.tabla.b2.x && this.sala.tabla.c1.x) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.x) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a1.o && this.sala.tabla.a2.o && this.sala.tabla.a3.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.b1.o && this.sala.tabla.b2.o && this.sala.tabla.b3.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.c1.o && this.sala.tabla.c2.o && this.sala.tabla.c3.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a1.o && this.sala.tabla.b1.o && this.sala.tabla.c1.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a2.o && this.sala.tabla.b2.o && this.sala.tabla.c2.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a3.o && this.sala.tabla.b3.o && this.sala.tabla.c3.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a1.o && this.sala.tabla.b2.o && this.sala.tabla.c3.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}
    if(this.sala.tabla.a3.o && this.sala.tabla.b2.o && this.sala.tabla.c1.o) {this.resultado = (this._authService.user.email == this.jugador1.email && this.jugador1.o) ? 'Ganaste!!' : 'Perdiste'; this.habilitado = false; this.jugador1.estadoJugada = false; this.jugador2.estadoJugada = false; return true}

    return false;
  }
}
