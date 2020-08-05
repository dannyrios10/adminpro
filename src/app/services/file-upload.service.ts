import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import Swal from 'sweetalert2';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ){
    try {

      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      Swal.fire('¡Bien Hecho!', data.msg, 'success');

      if(data.ok){
        return data.nombreArchivo;
      }else{
        Swal.fire('Ooups!', data.msg, 'error');
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}