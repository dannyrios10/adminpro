import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  base_url = environment.base_url;

  get token(): string {
    return localStorage.getItem('token') || "";

  }

  get headers(){
    return  {
      headers: {
        'x-token': this.token
      }
    }
  }

  constructor(private http: HttpClient) { 
  }

  cargarHospitales(){

   return this.http.get(`${this.base_url}/hospitales`, this.headers)
   .pipe(
     map((resp: {ok:boolean, hospitales: Hospital[]}) =>{
       return resp.hospitales
     })
   )
  
  }

  crearHospital(nombre: string){

   return this.http.post(`${this.base_url}/hospitales`, {nombre} ,this.headers);
  

  }
  actualizarHospital(_id: string, nombre: string){

   return this.http.put(`${this.base_url}/hospitales/${_id}`, {nombre} ,this.headers);
  
  }
  borrarHospital(_id: string){

   return this.http.delete(`${this.base_url}/hospitales/${_id}`,this.headers);
  
  }


}
