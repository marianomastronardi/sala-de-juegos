import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { JuegosModule } from './components/juegos/juegos.module';
import { SurveyComponent } from './components/survey/survey.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    NavbarComponent,
    RegistroComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    JuegosModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
