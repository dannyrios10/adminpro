import { Component} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.components.css']
})
export class ProgressComponent {

  progreso1 = 0;
  progreso2 = 0;

  get getValor1(){
    return `${this.progreso1}%`;
  }
  get getValor2(){
    return `${this.progreso2}%`;
  }
  

}
