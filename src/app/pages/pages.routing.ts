import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {AuthGuard} from '../guards/auth.guard';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
    
    { path: 'dashboard', component: PagesComponent,
      canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo:'Dashboard'} },
      {path: 'progress', component: ProgressComponent, data: {titulo:'Progress'} },
      {path: 'grafica', component: Grafica1Component, data: {titulo:'Grafica #1'} },
      {path: 'account', component: AccountSettingsComponent, data: {titulo:'Account Settings'} },
      {path: 'promesas', component: PromesasComponent, data: {titulo:'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo:'RxJs'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo:'Mi Perfil'}},

      // Mantenimientos

      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de Aplicación'} },
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales de Aplicación'} },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos de Aplicación'} },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medicos de Aplicación'} }
    ]
  },
  

];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class PagesRoutingModule {}
