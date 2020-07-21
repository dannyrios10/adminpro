import { Component} from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

label1: string[] = ['Label1', 'Label2', 'Label3'];

data1 = [Math.round(Math.random()*500), Math.round(Math.random()*500), Math.round(Math.random()*500)]
data2 = [Math.round(Math.random()*500), Math.round(Math.random()*500), Math.round(Math.random()*500)]
data3 = [Math.round(Math.random()*500), Math.round(Math.random()*500), Math.round(Math.random()*500)]
data4 = [Math.round(Math.random()*500), Math.round(Math.random()*500), Math.round(Math.random()*500)]

}