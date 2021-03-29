import { Component } from '@angular/core';
import { Usuario } from "../app/models/usuario";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sala-de-juegos';
  token:string | undefined;
}
