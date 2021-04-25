import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Survey } from "../models/survey";
@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private dbPath = '/surveyFire';

  SurveyRef: AngularFirestoreCollection<Survey>;

  constructor(private db: AngularFirestore) { 
    this.SurveyRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Survey> {
    return this.SurveyRef;
  }

  create(survey: Survey): any {
    return this.SurveyRef.add({ ...survey });
  }

  update(id: string, data: any): Promise<void> {
    return this.SurveyRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.SurveyRef.doc(id).delete();
  }

  // getSalaPorJuego(juego:string){
  //   return  this.db.collection(this.dbPath, ref => ref.where('nombreJuego', '==', juego).where('ready', '==', false).limit(1));
  // }
}
