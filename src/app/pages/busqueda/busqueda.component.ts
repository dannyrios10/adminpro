import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] =[];
  medicos: Medico[] =[];
  hospitales: Hospital[] =[];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedaService: BusquedaService) { }

  ngOnInit(): void {
    this.obtenerTermino();
  }

  obtenerTermino(){
    this.activatedRoute.params.subscribe(({termino}) =>{
      this.busquedaGlobal(termino);
    })
  }

  busquedaGlobal(termino: string){
      this.busquedaService.busquedaGlobal(termino)
      .subscribe((resp: any) =>{
        this.hospitales = resp.hospitales;
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
      })
  }


}
