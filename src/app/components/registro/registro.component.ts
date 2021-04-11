import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:Usuario = new Usuario();
  signUpError:string = '';
  constructor(private _authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
  }

  signUp(email:string, password:string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      //var token = user?.refreshToken == undefined ? '' : user.refreshToken;
      //Usuario.setToken(token);
      //this._authService.setUserAuthenticated();
      this._authService.setAuthenticatedUser(user?.uid, user?.email, user?.refreshToken)
      this.route.navigate(['home'])
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.signUpError = errorMessage;
      // ..
    });
  }
  /* signUp(){
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
  } */
}
