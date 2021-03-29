import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
}
