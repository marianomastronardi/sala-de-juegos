import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean = false;
  private dbpath: string = '/usuarios';
  usuarioRef: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore) {
    this.usuarioRef = db.collection(this.dbpath);
  }

  getAll(): AngularFirestoreCollection<Usuario> {
    return this.usuarioRef;
  }

  create(usuario: Usuario): any {
    return this.usuarioRef.add({ ...usuario });
  }

  getToken():string | undefined{
    return localStorage.getItem('token')?.toString();
  }

  setUserAuthenticated(){
    this.isAuthenticated = this.getToken() == undefined ? false : true;
    console.log(this.isAuthenticated)
  }
}
