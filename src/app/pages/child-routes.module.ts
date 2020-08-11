import { NgModule } from '@angular/core';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import {BusquedaComponent} from './busqueda/busqueda.component';
import {AdminGuard} from '../guards/admin.guard';
import { Routes, RouterModule } from '@angular/router';


const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {titulo:'Dashboard'} },
  {path: 'account', component: AccountSettingsComponent, data: {titulo:'Account Settings'} },
  {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo:'Account Settings'} },
  {path: 'progress', component: ProgressComponent, data: {titulo:'Progress'} },
  {path: 'grafica', component: Grafica1Component, data: {titulo:'Grafica #1'} },
  {path: 'promesas', component: PromesasComponent, data: {titulo:'Promesas'}},
  {path: 'rxjs', component: RxjsComponent, data: {titulo:'RxJs'}},
  {path: 'perfil', component: PerfilComponent, data: {titulo:'Mi Perfil'}},

  // Mantenimientos

  { path: 'usuarios',canActivate: [AdminGuard] ,component: UsuariosComponent, data: {titulo: 'Usuarios de Aplicación'} },


  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales de Aplicación'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos de Aplicación'} },
  { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medicos de Aplicación'} }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
