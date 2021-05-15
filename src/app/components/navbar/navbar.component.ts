import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:Usuario;
  isCollapsed:boolean = false;
  
  constructor(public _authService: AuthService) { 
    this.user = this._authService.user;;
  }

  ngOnInit(): void {
  }
  
  logOut(){
    //this.token = undefined;
    //Usuario.clearToken();
    //this._authService.setUserAuthenticated();
    this._authService.logout();
  }
}
