import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Sala } from "../models/sala";

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private dbPath = '/salasFire';

  SalaRef: AngularFirestoreCollection<Sala>;

  constructor(private db: AngularFirestore) { 
    this.SalaRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Sala> {
    return this.SalaRef;
  }

  create(sala: Sala): any {
    return this.SalaRef.add({ ...sala });
  }

  update(id: string, data: any): Promise<void> {
    return this.SalaRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.SalaRef.doc(id).delete();
  }

  getSalaPorJuego(juego:string){
    return  this.db.collection(this.dbPath, ref => ref.where('nombreJuego', '==', juego).where('ready', '==', false).limit(1));
  }

  getMiSalaPorJuego(juego:string){
    return  this.db.collection(this.dbPath, ref => ref.where('nombreJuego', '==', juego).where('ready', '==', true).where('finalizado', '==', false).limit(1));
  }
}
