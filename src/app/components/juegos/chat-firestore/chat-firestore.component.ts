import { Component, OnInit, Input } from '@angular/core';
import { MensajesFirestoreService } from '../../../services/mensajes-firestore.service';
import { Mensajes} from "../../../models/mensajes";
import { MensajesRealtimeService } from '../../../services/mensajes-realtime.service';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-firestore',
  templateUrl: './chat-firestore.component.html',
  styleUrls: ['./chat-firestore.component.css']
})
export class ChatFirestoreComponent implements OnInit {

  nuevoMensaje: Mensajes;
  listaMensajes: Mensajes[] = [];
  @Input() juego: string = '';

  constructor(private servicioFirestore: MensajesFirestoreService,
    private servicioRealTime: MensajesRealtimeService,
    public authService: AuthService,
    private _mensajeFirestore: MensajesFirestoreService) {
    this.nuevoMensaje = new Mensajes();
  };

  ngOnInit(): void {
    this._mensajeFirestore.getChatByGame(this.juego)
    .valueChanges()
    .subscribe((doc: Mensajes[]) => {
      this.listaMensajes = doc
      .sort((m1: Mensajes, m2: Mensajes) => {
        if (m1.fecha > m2.fecha) return 1;
        if (m1.fecha < m2.fecha) return -1;
        return 0
      })
    });
    /*this._mensajeFirestore.getAll()
       .valueChanges()
      .subscribe((doc: Mensajes[]) => {
        this.listaMensajes = doc
                              //.filter((value: Mensajes) => (value.juego == this.juego)) 
                              .sort((m1: Mensajes, m2: Mensajes) => {
                                if (m1.fecha > m2.fecha) return 1;
                                if (m1.fecha < m2.fecha) return -1;
                                return 0
                              })
                              .slice(doc.length - 5, doc.length)
      });
      this.listaMensajes = this.listaMensajes.filter((value: Mensajes) => (value.juego == this.juego)); */ 
  }

  onKey(event: any) { // without type info
    if(event.key == 'Enter') this.EnviarMensaje();
  }

  EnviarMensaje() {
    if (this.nuevoMensaje.mensaje.length > 0) {
      var d: Date = new Date();
      this.nuevoMensaje.fecha = [("0" + d.getDate()).slice(-2), (d.getMonth() + 1).toString().padStart(2, "0"), d.getFullYear()].join('/') + ' ' + [("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2), ("0" + d.getSeconds()).slice(-2)].join(':');
      this.nuevoMensaje.usuario = this.authService.user.email;
      this.nuevoMensaje.juego = this.juego;
      this.servicioFirestore.create(this.nuevoMensaje).then(() => {
        console.log("se envio el mensaje Fire");
      });
      this.servicioRealTime.create(this.nuevoMensaje).then(() => {
        console.log("se envio el mensaje RealTime");
      });
    }
    this.nuevoMensaje.mensaje = '';
  }

}
