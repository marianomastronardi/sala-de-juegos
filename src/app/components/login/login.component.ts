import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  isValidUser: boolean = true;
  isValidPassword: boolean = true;
  credential: any = {};

  constructor(private _authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.isValidUser = true;
    this.isValidPassword = true;

    this._authService.getAll()
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((user: any) => {
          if (user) {
            if (this.usuario.email == user.data().email) {
              if (this.usuario.password == user.data().password) {
                Usuario.setToken('Authorized');
                this._authService.setUserAuthenticated();
                this.route.navigate(['home'])
              } else {
                this.isValidPassword = false;
              }
            };
          } else {
            this.isValidUser = false;
          }
        });
        if (querySnapshot.docs.length > 0 && this.isValidPassword && this.isValidUser) this.isValidUser = false
      })
  }

  signInByGithub() {
    this.githubSignInPopup(this.githubProvider());
  }

  githubProvider() {
    // [START auth_github_provider_create]
    var provider = new firebase.auth.GithubAuthProvider();
    // [END auth_github_provider_create]

    // [START auth_github_provider_scopes]
    provider.addScope('email');
    // [END auth_github_provider_scopes]

    // [START auth_github_provider_params]
    provider.setCustomParameters({
      'allow_signup': 'false'
    });
    // [END auth_github_provider_params]
    return provider
  }

  githubProviderCredential(token: string) {
    // [START auth_github_provider_credential]
    this.credential = firebase.auth.GithubAuthProvider.credential(token);
    // [END auth_github_provider_credential]
  }

  githubSignInPopup(provider: any) {
    // [START auth_github_signin_popup]
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        /** @type {firebase.auth.OAuthCredential} */
        var credential:any = result.credential;
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token:string = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        // ...
        Usuario.setToken(token);
        this._authService.setUserAuthenticated();
        this.route.navigate(['home'])
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    // [END auth_github_signin_popup]
  }

  githubSignInRedirectResult() {
    // [START auth_github_signin_redirect_result]
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        console.log(result)
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = this.credential.accessToken;
          // ...
          console.log(token)
        }

        // The signed-in user info.
        var user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    // [END auth_github_signin_redirect_result]
  }

  // ==========================================================================================
  // Docs: Snippets in this file are "general purpose" and are used on more than one docs page
  // ==========================================================================================

  makeGoogleCredential(googleUser: any) {
    // [START auth_make_google_credential]
    var credential = firebase.auth.GoogleAuthProvider.credential(
      googleUser.getAuthResponse().id_token);
    // [END auth_make_google_credential]
  }

  makeFacebookCredential(response: any) {
    // [START auth_make_facebook_credential]
    var credential = firebase.auth.FacebookAuthProvider.credential(
      response.authResponse.accessToken);
    // [END auth_make_facebook_credential]
  }

  makeEmailCredential(email: string, password: string) {
    // [START auth_make_email_credential]
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    // [END auth_make_email_credential]
  }

  signOut() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    // [END auth_sign_out]
  }

  authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    // [END auth_state_listener]
  }

  setLanguageCode() {
    // [START auth_set_language_code]
    firebase.auth().languageCode = 'it';
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();
    // [END auth_set_language_code]
  }
  authWithCredential(credential: any) {
    // [START auth_signin_credential]
    // Sign in with the credential from the user.
    firebase.auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Signed in 
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // ...
      });
    // [END auth_signin_credential]
  }

  signInRedirect(provider: any) {
    // [START auth_signin_redirect]
    firebase.auth().signInWithRedirect(provider);
    // [END auth_signin_redirect]
  }
}
