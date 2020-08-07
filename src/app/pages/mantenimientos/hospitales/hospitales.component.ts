import { Component, OnInit, OnDestroy } from '@angular/core';
import {HospitalService} from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BusquedaService } from 'src/app/services/busqueda.service';

const base_url = environment.base_url;


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitales: Hospital[] =[]
  cargando = true;
  public imgSubs: Subscription


  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedaService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe(img => {
      this.cargarHospitales();
    });
  }

  busqueda(termino: string){

    if(termino.length === 0){
      return this.cargarHospitales();
    }
  
      this.busquedaService.buscar('hospitales', termino)
      .subscribe((resp: Hospital[]) =>{

        this.hospitales = resp;
        
      })
    }

  cargarHospitales(){
    this.cargando= true;
    this.hospitalService.cargarHospitales()
    .subscribe((resp) => {
      this.cargando = false;
      this.hospitales = resp;
    })
  }

  actualizarHospital( hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
    .subscribe(resp =>{
      Swal.fire('Actualizado', `El nombre se ha actualizado correctamente`, "success");
      this.cargarHospitales();
    })
  }
  borrarHospital( hospital: Hospital){
  
    Swal.fire({
      title: '¿Deseas borrar el hospital?',
      text: `Estás a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital._id)
        .subscribe(resp => {
          Swal.fire(
            '!Eliminado!',
            `Has eliminado a ${hospital.nombre} correctamente`,
            'success'
          )
          this.cargarHospitales();
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
  
  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    })

    if(value.trim().length > 0){
      this.hospitalService.crearHospital(value)
      .subscribe((resp: any) =>{
        Swal.fire('¡Muy Bien!', `El Nuevo Hospital ha sido añadido correctamente`, "success");
        this.hospitales.push(resp.hospital);
      })
    }else{
      Swal.fire('¡Aviso!', `No se ha hecho ningun cambio`, "info");
    }
  }

  abrirModal(hospital: Hospital){

    let imagen = '';
    
    if(hospital.img){
      imagen = `${base_url}/upload/hospitales/${hospital.img}`;
    }else{
      imagen = `${base_url}/upload/hospitales/no-image`;
    }

    this.modalImagenService.abrirModal('hospitales', hospital._id, imagen);
  }
  

}
