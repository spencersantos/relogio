import { TemporizadorComponent } from './temporizador/temporizador.component';
import { CronometroComponent } from './cronometro/cronometro.component';
import { RelogioComponent } from './relogio/relogio.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: RelogioComponent},
  {path: 'cronometro', component: CronometroComponent},
  {path: 'temporizador', component: TemporizadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
