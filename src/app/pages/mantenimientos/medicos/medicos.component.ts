import { Component, OnInit, OnDestroy } from '@angular/core';
import {MedicoService} from '../../../services/medico.service'
import{ Medico} from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedaService } from 'src/app/services/busqueda.service';

const base_url = environment.base_url;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  constructor(private medicosService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedaService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  medicos: Medico[] = [];
  cargando = true;
  public imgSubs: Subscription


  ngOnInit(): void {
    this.obtenerMedico();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(200)
    )
    .subscribe(img => {
    this.obtenerMedico();
  });
  }


  busqueda(termino: string){

    if(termino.length === 0){
      return this.obtenerMedico();
    }
  
      this.busquedaService.buscar('medicos',termino)
      .subscribe((resp: Medico[]) =>{
        this.medicos = resp;
      })
    }

  obtenerMedico(){
    this.cargando = true
    this.medicosService.obtenerMedicos()
    .subscribe(medicos => {
      this.medicos = medicos;
      this.cargando = false;
    })
    
  }

  borrarMedico(medico: Medico){
    
        Swal.fire({
          title: '¿Deseas borrar al médico?',
          text: `Estás a punto de borrar a ${medico.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrar!'
        }).then((result) => {
          if (result.value) {
            this.medicosService.borrarMedico(medico._id)
            .subscribe(() => {
              Swal.fire(
                '!Eliminado!',
                `Has eliminado a ${medico.nombre} correctamente`,
                'success'
              )
              this.obtenerMedico();
            },(error) =>{
              Swal.fire(
                '!Ocurrio un error!',
                error.error.msg,
                'error'
              )
            })
           
          }
        })
        
  }

  abrirModal(medico: Medico){
    let imagen = '';
    
    if(medico.img){
      imagen = `${base_url}/upload/medicos/${medico.img}`;
    }else{
      imagen = `${base_url}/upload/medicos/no-image`;
    }

    this.modalImagenService.abrirModal('medicos', medico._id, imagen);
  }

  }

