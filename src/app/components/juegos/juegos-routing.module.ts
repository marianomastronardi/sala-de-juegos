import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiedraPapelOTijeraComponent } from './piedra-papel-o-tijera/piedra-papel-o-tijera.component';
import { TaTeTiComponent } from './ta-te-ti/ta-te-ti.component';

const routes: Routes = [
  { path: 'PiedraPapelOTijera', component: PiedraPapelOTijeraComponent},
  { path: 'TaTeTi', component: TaTeTiComponent},
  { path: '', redirectTo:'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
