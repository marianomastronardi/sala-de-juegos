import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemotestComponent } from './memotest/memotest.component';
import { PiedraPapelOTijeraComponent } from './piedra-papel-o-tijera/piedra-papel-o-tijera.component';
import { QuizzComponent } from './quizz/quizz.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { TaTeTiComponent } from './ta-te-ti/ta-te-ti.component';

const routes: Routes = [
  { path: 'PiedraPapelOTijera', component: PiedraPapelOTijeraComponent},
  { path: 'TaTeTi', component: TaTeTiComponent},
  { path: 'Memotest', component: MemotestComponent},
  { path: 'Quiz', component: QuizzComponent},
  { path: '**', redirectTo:'Home', pathMatch: 'full' },
  { path: '', redirectTo:'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
