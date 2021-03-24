import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component'
import { LoginComponent} from './components/login/login.component'
import { QuienSoyComponent} from './components/quien-soy/quien-soy.component'

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'quien-soy', component: QuienSoyComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: LoginComponent},
  {path: '**', pathMatch: 'full', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
