import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token:string | undefined;
  constructor(public _authService: AuthService) { 
  }

  ngOnInit(): void {
  }
  
  logOut(){
    this.token = undefined;
    Usuario.clearToken();
    this._authService.setUserAuthenticated();
  }
}
