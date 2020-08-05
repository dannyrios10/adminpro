import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador.component';

import { ChartsModule } from 'ng2-charts';

import{FormsModule} from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component'



@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalImagenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    ChartsModule,
    DonaComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
