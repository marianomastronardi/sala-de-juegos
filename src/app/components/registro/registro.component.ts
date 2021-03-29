import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:Usuario = new Usuario();
  alreadyExistsUser:boolean = false;
  constructor(private _authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this.alreadyExistsUser = false;

    this._authService.getAll()
    .get()
    .subscribe((querySnapshot) => {
      querySnapshot.forEach((user:any) => {
          if(user){
            if(this.usuario.email == user.data().email){
                this.alreadyExistsUser = true;
            };
          }
      });
      if(!this.alreadyExistsUser){
        //Alta de usuario
        this._authService.create(this.usuario);
        Usuario.setToken('Authorized');
        this._authService.setUserAuthenticated();
        this.route.navigate(['home'])
      }
  })
  }
}
