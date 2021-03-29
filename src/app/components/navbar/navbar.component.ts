import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token:string | undefined;
  constructor() { 
  }

  ngOnInit(): void {
  }
  
  logOut(){
    this.token = undefined;
    Usuario.clearToken();
  }
}
