import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    if(!(Usuario.getToken())){
      this.route.navigate(['signin'])
    }    
  }

  gotoGame(game:string){
    this.route.navigate([game]);
  }
}
