import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { Sala } from 'src/app/models/sala';
import { AuthService } from 'src/app/services/auth.service';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  juego:string = 'PiedraPapelOTijera';
  sala:Sala[] = [];
  player!:Jugador;
  scores:any[] = [];
  constructor(private _activatedRoute:ActivatedRoute,
    private route:Router,
    private _authService:AuthService,
    private _salaService:SalaService) { }

  ngOnInit(): void {
    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    }else{
      this._salaService.getScoresByGame(this.juego)
      .valueChanges()
      .subscribe((doc:any) => {
        this.sala = doc;
        this.sala.forEach((value:Sala) => {
          console.log(value)
          this.player = JSON.parse(value.player);
          console.log(value)
          if(this.player.score > 0){
            this.scores.push({email:this.player.email, score:this.player.score, game:value.nombreJuego})
          }
        })
        this.scores = this.scores.sort((a,b) => a.score -b.score);
      })
    }
  }

  choose(e:any):void{
    this.juego = e.target.defaultValue;
    this.scores = [];
    this._salaService.getScoresByGame(this.juego)
      .valueChanges()
      .subscribe((doc:any) => {
        this.sala = doc;
        this.sala.forEach((value:Sala) => {
          console.log(value)
          this.player = JSON.parse(value.player);
          console.log(value)
          if(this.player.score > 0){
            this.scores.push({email:this.player.email, score:this.player.score, game:value.nombreJuego})
          }
        })
        this.scores = this.scores.sort((a,b) => a.score -b.score);
      })
  }
}
