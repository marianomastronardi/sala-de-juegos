import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalaService } from 'src/app/services/sala.service';
import { map } from "rxjs/operators";
import { Sala } from 'src/app/models/sala';
import { Jugador } from 'src/app/models/jugador';
import { uid } from 'uid';
import { ClassField } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  juego: string = 'Memotest';
  tablaMemo: any = {};
  positions: Array<{ id: number, photo: string }> = [];
  resultado: string = '';
  sala: Sala;
  listaSalas: Sala[] = [];
  jugador1!: Jugador;
  jugador2!: Jugador;
  listPlayers: Jugador[] = [];
  docID: string = '';
  jugada: any = {};
  img: any[] = [];
  fichas: string[] = [];
  soyJugadorUno: boolean = false;
  habilitado: boolean = false;

  private searchEventSubscription: Subscription = new Subscription();

  constructor(private _http: HttpClient,
    public _authService: AuthService,
    private route: Router,
    private _salaService: SalaService) {
    this.sala = new Sala();
  }

  ngOnInit(): void {
    this.init();
    this.jugada.primerClick = false;
    this.jugada.segundoClick = false;
    this.jugada.idPrimerClick = '';
    this.jugada.idSegundoClick = '';
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
              this.jugador2 = new Jugador();
              this.jugador2.estadoJugada = false;
              this.sala.jugador1 = JSON.stringify(this.jugador1);
              this.sala.jugador2 = JSON.stringify(this.jugador2);
              this.buildBox();
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
                this.jugador2.estadoJugada = true;
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
            //this.sala.chosen = doc[0].chosen;
            this.sala.tablaMemo = doc[0].tablaMemo;
            this.tablaMemo = this.sala.tablaMemo;
            this.jugador1 = new Jugador();
            this.jugador2 = new Jugador();
            this.jugador1 = JSON.parse(doc[0].jugador1);
            this.jugador2 = JSON.parse(doc[0].jugador2);
            this.soyJugadorUno = this.soyJugador1();
            this.habilitado = this.bEstadoJugada();
          }
        }
        )
  }

  setSala(oSala: Sala) {
    this.sala = oSala;
  }

  buildBox() {
    console.log('buildBox')
    this.tablaMemo.a1 = false;
    this.tablaMemo.a2 = false;
    this.tablaMemo.a3 = false;
    this.tablaMemo.a4 = false;
    this.tablaMemo.b1 = false;
    this.tablaMemo.b2 = false;
    this.tablaMemo.b3 = false;
    this.tablaMemo.b4 = false;
    this.tablaMemo.c1 = false;
    this.tablaMemo.c2 = false;
    this.tablaMemo.c3 = false;
    this.tablaMemo.c4 = false;

    for (let index = 0; index < 12; index++) {
      let n: number;
      do {
        n = Math.floor(Math.random() * 12);
      } while (this.positions.includes({ id: n, photo: '' }));
      this.positions.push({ id: n, photo: '' });
    }

    this._http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
      .subscribe((data: any) => {

        this.img = data.drinks;
        for (let index = 0; index < this.positions.length; index++) {
          this.positions[index] = { id: this.positions[index].id, photo: this.img[index - ((index < 6) ? 0 : 6)].strDrinkThumb }
        }

        console.log('positions', this.positions)

        var old: number = -1;
        this.positions.forEach((element: any) => {

          if (element.id > old) {
            this.fichas.push(element.photo);
            old = element.id;
          } else {
            this.fichas.unshift(element.photo);
            old = element.id;
          }
        })

        this.tablaMemo.fichas = {};
        this.tablaMemo.fichas.a1 = this.fichas[0];
        this.tablaMemo.fichas.a2 = this.fichas[1];
        this.tablaMemo.fichas.a3 = this.fichas[2];
        this.tablaMemo.fichas.a4 = this.fichas[3];
        this.tablaMemo.fichas.b1 = this.fichas[4];
        this.tablaMemo.fichas.b2 = this.fichas[5];
        this.tablaMemo.fichas.b3 = this.fichas[6];
        this.tablaMemo.fichas.b4 = this.fichas[7];
        this.tablaMemo.fichas.c1 = this.fichas[8];
        this.tablaMemo.fichas.c2 = this.fichas[9];
        this.tablaMemo.fichas.c3 = this.fichas[10];
        this.tablaMemo.fichas.c4 = this.fichas[11];

        this.tablaMemo.jugada = {};
        this.sala.tablaMemo = this.tablaMemo;

        console.log('create', this.sala)
        this._salaService.create(this.sala);
        this.searchEventSubscription.unsubscribe()
        this.getMyRoom()
      });

  }

  pulsar(drink: string) {
    this.tablaMemo = this.sala.tablaMemo;
    this.jugada = this.tablaMemo.jugada;

    switch (drink.split('$')[0]) {
      case 'a1':
        this.tablaMemo.a1 = true;
        break;
      case 'a2':
        this.tablaMemo.a2 = true;
        break;
      case 'a3':
        this.tablaMemo.a3 = true;
        break;
      case 'a4':
        this.tablaMemo.a4 = true;
        break;
      case 'b1':
        this.tablaMemo.b1 = true;
        break;
      case 'b2':
        this.tablaMemo.b2 = true;
        break;
      case 'b3':
        this.tablaMemo.b3 = true;
        break;
      case 'b4':
        this.tablaMemo.b4 = true;
        break;
      case 'c1':
        this.tablaMemo.c1 = true;
        break;
      case 'c2':
        this.tablaMemo.c2 = true;
        break;
      case 'c3':
        this.tablaMemo.c3 = true;
        break;
      case 'c4':
        this.tablaMemo.c4 = true;
        break;
      default:
        break;
    }

    if (!this.jugada.primerClick) {
      //es el primer click
      this.jugada.primerClick = !this.jugada.primerClick;
      this.jugada.idPrimerClick = drink.split('$')[0];
      this.jugada.photoPrimerClick = drink.split('$')[1];
      this.updateSala()
    } else {
      this.jugada.segundoClick = !this.jugada.segundoClick;
      this.jugada.idSegundoClick = drink.split('$')[0];
      this.jugada.photoSegundoClick = drink.split('$')[1];

      if (this.jugada.photoPrimerClick == this.jugada.photoSegundoClick) {
        //acierto
        this.soyJugador1() ? this.jugador1.puntosSesion++ : this.jugador2.puntosSesion++;
        this.sala.resultado = 'Match!!';
        this.soyJugador1() ? this.jugador1.estadoJugada = false : this.jugador2.estadoJugada = false;
        this.updateSala();
      } else {
        //desacierto
        this.sala.resultado = 'No match';
        this.soyJugador1() ? this.jugador1.estadoJugada = false : this.jugador2.estadoJugada = false;
        this.updateSala();

        setTimeout(() => {
          console.log('timeout')
          //habilito a jugar al rival
          this.soyJugador1() ? this.jugador2.estadoJugada = true : this.jugador1.estadoJugada = true;
          this.sala.resultado = '';
          
          //vuelvo atras la jugada
          for (let index = 0; index < 2; index++) {
            switch (index === 0 ? drink.split('$')[0] : this.jugada.idPrimerClick) {
              case 'a1':
                this.tablaMemo.a1 = false;
                break;
              case 'a2':
                this.tablaMemo.a2 = false;
                break;
              case 'a3':
                this.tablaMemo.a3 = false;
                break;
              case 'a4':
                this.tablaMemo.a4 = false;
                break;
              case 'b1':
                this.tablaMemo.b1 = false;
                break;
              case 'b2':
                this.tablaMemo.b2 = false;
                break;
              case 'b3':
                this.tablaMemo.b3 = false;
                break;
              case 'b4':
                this.tablaMemo.b4 = false;
                break;
              case 'c1':
                this.tablaMemo.c1 = false;
                break;
              case 'c2':
                this.tablaMemo.c2 = false;
                break;
              case 'c3':
                this.tablaMemo.c3 = false;
                break;
              case 'c4':
                this.tablaMemo.c4 = false;
                break;
              default:
                break;
            }

          }
          this.jugada.idPrimerClick = '';
          this.jugada.idSegundoClick = '';
          this.jugada.primerClick = false;
          this.jugada.segundoClick = false;
          this.jugada.photoPrimerClick = '';
          this.jugada.photoSegundoClick = '';
          this.updateSala()
        }, 2000);
      }
    }

  }

  soyJugador1(): boolean {
    return (this._authService.user.email == this.jugador1.email)
  }

  bEstadoJugada(): boolean {
    return this.soyJugador1() ? this.jugador1.estadoJugada : this.jugador2.estadoJugada;
  }

  setearJugada() {
    if (this.soyJugador1()) {
      this.jugador1.estadoJugada = !this.jugador1.estadoJugada;
    } else {
      this.jugador2.estadoJugada = !this.jugador2.estadoJugada;
    }
  }

  updateSala() {
    this.sala.jugador1 = JSON.stringify(this.jugador1);
    this.sala.jugador2 = JSON.stringify(this.jugador2);
    this.tablaMemo.jugada = this.jugada;
    this.sala.tablaMemo = this.tablaMemo;
    console.log(this.docID)
    console.log( Object.assign({}, this.sala))
    this._salaService.update(this.docID, Object.assign({}, this.sala));
  }
}
