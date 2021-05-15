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

  tablaMemo: any = {};
  positions: Array<{ id: number, photo: string }> = [];
  resultado: string = '';
  sala!: Sala;
  player!: Jugador;
  bot!: Jugador;
  docID: string = '';
  jugada: any = {};
  img: any[] = [];
  fichas: string[] = [];
  habilitado: boolean = true;

  private searchEventSubscription: Subscription = new Subscription();

  constructor(private _http: HttpClient,
    public _authService: AuthService,
    private route: Router,
    private _salaService: SalaService) {
  }

  ngOnInit(): void {
    this.sala = new Sala();
    this.sala.nombreJuego = 'Memotest';
    this.player = new Jugador();
    this.bot = new Jugador();
    this.player.email = this._authService.user.email;
    this.player.estado = true;
    this.sala.player = JSON.stringify(this.player);
    this.sala.bot = JSON.stringify(this.bot);
    //this.buildBox();
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

        this.tablaMemo.jugada = {
          idPrimerClick: '', idSegundoClick: '', primerClick: false,
          segundoClick: false, photoPrimerClick: '', photoSegundoClick: ''
        };

        this.sala.tablaMemo = this.tablaMemo;

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
                if (this.habilitado && this.bot.estado && !this.sala.tablaMemo.jugada.primerClick && !this.sala.tablaMemo.jugada.segundoClick && !this.sala.finalizado) this.setJugadaBot();
              })
          })
        }
      })
  }

  setJugadaBot() {
    //this.tablaMemo.a4
    //'b4$'+sala.tablaMemo.fichas.b4
    let verify = false;
    let cell = '';

    for (let index = 0; index < 2; index++) {
      do {
        let option = Math.floor(Math.random() * 12) + 1;

        switch (option) {
          case 1:
            verify = this.tablaMemo.a1;
            cell = 'a1$' + this.sala.tablaMemo.fichas.a1;
            break;
          case 2:
            verify = this.tablaMemo.a2;
            cell = 'a2$' + this.sala.tablaMemo.fichas.a2;
            break;
          case 3:
            verify = this.tablaMemo.a3;
            cell = 'a3$' + this.sala.tablaMemo.fichas.a3;
            break;
          case 4:
            verify = this.tablaMemo.a4;
            cell = 'a4$' + this.sala.tablaMemo.fichas.a4;
            break;
          case 5:
            verify = this.tablaMemo.b1;
            cell = 'b1$' + this.sala.tablaMemo.fichas.b1;
            break;
          case 6:
            verify = this.tablaMemo.b2;
            cell = 'b2$' + this.sala.tablaMemo.fichas.b2;
            break;
          case 7:
            verify = this.tablaMemo.b3;
            cell = 'b3$' + this.sala.tablaMemo.fichas.b3;
            break;
          case 8:
            verify = this.tablaMemo.b4;
            cell = 'b4$' + this.sala.tablaMemo.fichas.b4;
            break;
          case 9:
            verify = this.tablaMemo.c1;
            cell = 'c1$' + this.sala.tablaMemo.fichas.c1;
            break;
          case 10:
            verify = this.tablaMemo.c2;
            cell = 'c2$' + this.sala.tablaMemo.fichas.c2;
            break;
          case 11:
            verify = this.tablaMemo.c3;
            cell = 'c3$' + this.sala.tablaMemo.fichas.c3;
            break;
          case 12:
            verify = this.tablaMemo.c4;
            cell = 'c4$' + this.sala.tablaMemo.fichas.c4;
            break;
          default:
            break;
        }
      } while (verify);
      this.pulsar(cell);
    }
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
      //primer click
      this.jugada.primerClick = !this.jugada.primerClick;
      this.jugada.idPrimerClick = drink.split('$')[0];
      this.jugada.photoPrimerClick = drink.split('$')[1];
      this.tablaMemo.jugada = this.jugada;
      this.sala.tablaMemo = this.tablaMemo;
      this.updateSala()
    } else {
      //segundo click
      this.habilitado = false;
      let isPlayer = this.player.estado;
      this.jugada.segundoClick = !this.jugada.segundoClick;
      this.jugada.idSegundoClick = drink.split('$')[0];
      this.jugada.photoSegundoClick = drink.split('$')[1];

      if (this.jugada.photoPrimerClick == this.jugada.photoSegundoClick) {
        //acierto
        if(this.player.estado) {
          this.player.puntosSesion += 1;
        } else {
          this.bot.puntosSesion += 1;
        }
        this.sala.resultado = 'Match!!';
        this.sala.player = JSON.stringify(this.player);
        this.sala.bot = JSON.stringify(this.bot);
        this.jugada.idPrimerClick = '';
        this.jugada.idSegundoClick = '';
        
        this.jugada.photoPrimerClick = '';
        this.jugada.photoSegundoClick = '';
        this.sala.resultado = (this.player.puntosSesion + this.bot.puntosSesion) == 6 ? (this.player.puntosSesion > this.bot.puntosSesion) ? 'Ganaste' : (this.player.puntosSesion < this.bot.puntosSesion) ? 'Perdiste' : 'Empate' : '';
        this.sala.finalizado = ((this.player.puntosSesion + this.bot.puntosSesion) == 6);
        if (this.sala.finalizado) {
          if(this.player.puntosSesion > this.bot.puntosSesion){
            this.player.score = Math.round(Math.abs((new Date().getTime() - new Date(this.sala.startDate).getTime()) / 1000));
            this.sala.player = JSON.stringify(this.player);
          }
        }
        this.tablaMemo.jugada = this.jugada;
        this.sala.tablaMemo = this.tablaMemo;
        this.updateSala();

        setTimeout(() => {
          this.jugada.primerClick = false;
          this.jugada.segundoClick = false;
          this.tablaMemo.jugada = this.jugada;
          this.sala.tablaMemo = this.tablaMemo;
          this.updateSala();
          this.habilitado = true;          
        }, 2000);
      } else {
        //desacierto
        this.sala.resultado = 'Not match';

        setTimeout(() => {
          //vuelvo atras la jugada
        for (let index = 0; index < 2; index++) {
          switch (index === 0 ? this.jugada.idPrimerClick : this.jugada.idSegundoClick) {
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

          this.habilitado = true;
          this.sala.tablaMemo = this.tablaMemo;
          this.player.estado = !isPlayer;
          this.bot.estado = isPlayer;
          this.jugada.idPrimerClick = '';
          this.jugada.idSegundoClick = '';
          this.jugada.primerClick = false;
          this.jugada.segundoClick = false;
          this.jugada.photoPrimerClick = '';
          this.jugada.photoSegundoClick = '';
          this.tablaMemo.jugada = this.jugada;
          this.sala.resultado = '';
          this.updateSala()
        }, 2000);
      }
    }
  }

  updateSala() {
    this.sala.player = JSON.stringify(this.player);
    this.sala.bot = JSON.stringify(this.bot);
    this.tablaMemo.jugada = this.jugada;
    this.sala.tablaMemo = this.tablaMemo;
    this._salaService.update(this.docID, Object.assign({}, this.sala));
  }
}
