import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PiedraPapelOTijeraComponent } from './piedra-papel-o-tijera/piedra-papel-o-tijera.component';
import { TaTeTiComponent } from './ta-te-ti/ta-te-ti.component';
import { FormSubirArchivosComponent } from './form-subir-archivos/form-subir-archivos.component';
import { ChatFirestoreComponent } from './chat-firestore/chat-firestore.component';
import { ListadoRealtimeComponent } from './listado-realtime/listado-realtime.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
      PiedraPapelOTijeraComponent, 
      TaTeTiComponent, 
      FormSubirArchivosComponent, 
      ChatFirestoreComponent, 
      ListadoRealtimeComponent
    ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
