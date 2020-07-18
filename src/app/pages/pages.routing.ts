import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    
    { path: 'dashboard', component: PagesComponent,
    children: [
      {path: '', component: DashboardComponent },
      {path: 'progress', component: ProgressComponent },
      {path: 'grafica', component: Grafica1Component },
    ]
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
