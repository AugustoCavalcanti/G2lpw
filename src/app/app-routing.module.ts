import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './usuario/usuario.component';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: 'usuario/:id', component: UsuarioComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
