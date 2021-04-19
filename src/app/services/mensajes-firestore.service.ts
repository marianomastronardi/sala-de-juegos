import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensajes } from '../models/mensajes';

@Injectable({
  providedIn: 'root'
})
export class MensajesFirestoreService {

  private dbPath = '/mensajesFire';

  MensajesRef: AngularFirestoreCollection<Mensajes>;

  constructor(private db: AngularFirestore) {
    this.MensajesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Mensajes> {
    return this.MensajesRef;
  }

  create(mensajes: Mensajes): any {
    return this.MensajesRef.add({ ...mensajes });
  }

  update(id: string, data: any): Promise<void> {
    return this.MensajesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.MensajesRef.doc(id).delete();
  }

  getChatByGame(juego:string): AngularFirestoreCollection<Mensajes> {
    //where('juego','==', juego).
    return  this.db.collection(this.dbPath, ref => ref.orderBy('fecha','desc').limit(5));
  }
  //this.MensajesRef = db.collection(this.dbPath, ref => ref.where('juego','==', juego)..orderBy('created'));
}
