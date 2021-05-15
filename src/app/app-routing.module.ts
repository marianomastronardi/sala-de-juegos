import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component'
import { ResultadosComponent } from './components/juegos/resultados/resultados.component';
import { LoginComponent} from './components/login/login.component'
import { QuienSoyComponent} from './components/quien-soy/quien-soy.component'
import { RegistroComponent } from './components/registro/registro.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'quien-soy', component: QuienSoyComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: RegistroComponent},
  {path: 'survey', component: SurveyComponent},
  {path: 'resultados', component: ResultadosComponent},
  { path: 'juegos', loadChildren: () => import('./components/juegos/juegos.module').then(m => m.JuegosModule) },
  {path: '**', pathMatch: 'full', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
