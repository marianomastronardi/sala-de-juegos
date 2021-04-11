import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styles: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

  tabla: any = {};
  jugador:any = {};

  constructor(private _authService: AuthService,
    private route: Router) {
    
  }

  ngOnInit(): void {
    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    }
    this.tabla.a1 = false;
    this.tabla.a2 = false;
    this.tabla.a3 = false;
    this.tabla.b1 = false;
    this.tabla.b2 = false;
    this.tabla.b3 = false;
    this.tabla.c1 = false;
    this.tabla.c2 = false;
    this.tabla.c3 = false;
    this.jugador.x = false;
    this.jugador.o = false;
    this.jugador.eligio = false;
  }

  elegirOpcion(opcion:string){
    if(opcion == 'x') {
      this.jugador.x = true;
    }else{
      this.jugador.o = true;
    }
    this.jugador.eligio = true;
  }

  pulsar(celda: string) {
    switch (celda) {
      case 'a1':
        this.tabla.a1 = true;
        break;
      case 'a2':
        this.tabla.a2 = true;
        break;
      case 'a3':
        this.tabla.a3 = true;
        break;
      case 'b1':
        this.tabla.b1 = true;
        break;
      case 'b2':
        this.tabla.b2 = true;
        break;
      case 'b3':
        this.tabla.b3 = true;
        break;
      case 'c1':
        this.tabla.c1 = true;
        break;
      case 'c2':
        this.tabla.c2 = true;
        break;
      case 'c3':
        this.tabla.c3 = true;
        break;
      default:
        break;
    }
  }

}
