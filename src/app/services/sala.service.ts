import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
}
