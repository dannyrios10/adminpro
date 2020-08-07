import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {BusquedaService} from '../../../services/busqueda.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde = 0;
  public cargando = true;
  public imgSubs: Subscription

  constructor( private usuarioService: UsuarioService,
               private busquedaService: BusquedaService,
               private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe(img => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total;
      if(usuarios.length !== 0){
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
      }
      this.cargando = false;
    })
  }

  cambiarPagina( valor:number){
    this.desde += valor;

    if(this.desde <0){
      this.desde = 0;
    }else if(this.desde> this.totalUsuarios){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  busqueda(termino: string){

  if(termino.length === 0){
    return this.usuarios = this.usuariosTemp;
  }

    this.busquedaService.buscar('usuarios',termino)
    .subscribe((resp: Usuario[]) =>{
      this.usuarios = resp;
    })
  }

  eliminarUsuario( usuario: Usuario){

    if(usuario.uid === this.usuarioService.usuario.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
   
    Swal.fire({
      title: '¿Deseas borrar el usuario?',
      text: `Estás a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe(resp => {
          Swal.fire(
            '!Eliminado!',
            `Has eliminado a ${usuario.nombre} correctamente`,
            'success'
          )
          this.cargarUsuarios();
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

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
    .subscribe(resp => {
      console.log(resp);
    })
  }

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.imagenUrl);
  }

}
