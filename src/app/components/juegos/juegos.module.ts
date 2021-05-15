import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PiedraPapelOTijeraComponent } from './piedra-papel-o-tijera/piedra-papel-o-tijera.component';
import { TaTeTiComponent } from './ta-te-ti/ta-te-ti.component';
import { FormSubirArchivosComponent } from './form-subir-archivos/form-subir-archivos.component';
import { ChatFirestoreComponent } from './chat-firestore/chat-firestore.component';
import { ListadoRealtimeComponent } from './listado-realtime/listado-realtime.component';
import { FormsModule } from '@angular/forms';
import { MemotestComponent } from './memotest/memotest.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizzComponent } from './quizz/quizz.component';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [
      PiedraPapelOTijeraComponent, 
      TaTeTiComponent, 
      FormSubirArchivosComponent, 
      ChatFirestoreComponent, 
      ListadoRealtimeComponent, 
      MemotestComponent, QuizzComponent, ResultadosComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,

    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
