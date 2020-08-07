import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => {
      this.cargarMedico(id);
    })

    this.cargarHospitales(); 

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.medicoForm.get('hospital').valueChanges
    .subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalId);
    })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe((hospitales: Hospital[]) =>{
      this.hospitales = hospitales;
    })
  }

  crearMedico(){

    if(this.medicoSeleccionado){
      // actualizar
      const data= {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
      .subscribe((resp: any) =>{
        Swal.fire('Correcto', 'Se ha actualizado el medico exitosamente', 'success');
      })

    }else{
      //crear
      this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe((resp: any) =>{
        Swal.fire('Correcto', 'Se ha creado el medico exitosamente', 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.Medico._id}`);
      })
    }

  }

  cargarMedico(id: string){

    if(id === 'nuevo'){
      return;
    }

    this.medicoService.obtenerMedico(id)
    .pipe(
      delay(100)
    )
    .subscribe(medico =>{

      if(!medico){
        return this.router.navigateByUrl(`/dashboard/medicos`);
      }

      const {nombre, hospital:{_id}} = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({nombre, hospital: _id});
    })

  }



}
