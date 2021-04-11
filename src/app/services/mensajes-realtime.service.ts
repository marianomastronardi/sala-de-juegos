import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Mensajes } from '../models/mensajes';

@Injectable({
  providedIn: 'root'
})
export class MensajesRealtimeService {

  private dbPath = '/MensajesReal';

  MensajesRef: AngularFireList<Mensajes>;

  constructor(private db: AngularFireDatabase) {
    this.MensajesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Mensajes> {
    return this.MensajesRef;
  }

  create(unMensajes: Mensajes): any {
    return this.MensajesRef.push(unMensajes);
  }

  update(key: string, value: any): Promise<void> {
    return this.MensajesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.MensajesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.MensajesRef.remove();
  }
}
