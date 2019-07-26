import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

// modelo de usuario
import { Usuario } from '../../models/usuario.model';

// contiene la ruta del backend
import { environment } from '../../../environments/environment'

// para mostrar alerts
import Swal from 'sweetalert2';

// servicio para subir imagen
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor( private http: HttpClient,
               private router: Router,
               private uploadService: SubirArchivoService ) {

    this.cargarStorage();

  }

  cargarUsuarios( desde: number = 0 ) {

    let url = environment.url + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    let url = environment.url + `/busqueda/coleccion/usuarios/${ termino }`;

    return this.http.get( url )
      .pipe( map( ( respuesta: any ) => {

        return respuesta.usuarios;

      } ) );

  }

  crearUsuario( usuario: Usuario ) {

  	let url = environment.url + '/usuario';

  	return this.http.post( url, usuario )
  		.pipe( map( ( respuesta: any ) => {

  			Swal.fire( 'Nuevo usuario', usuario.email, 'success' );
  			return respuesta.usuario;

  		} ), catchError( error => {

        // console.error( error );
        Swal.fire( error.error.mensaje, error.error.errors.message, 'error' );
        throw error;        

      } ) );

  }

  actualizarUsuario( usuario: Usuario ) {

    let url = environment.url + '/usuario/' + usuario._id;
        url += '?token=' + this.token;

    console.log( url );

    return this.http.put( url, usuario )
      .pipe( map( ( respuesta: any ) => {

        // usuario logueado = a usario que se editó
        if( this.usuario._id === usuario._id ) {

          let user = respuesta.usuario;

          this.guardarStorage( user._id, this.token, user, this.menu );

        }

        Swal.fire( 'Usuario actualizado', usuario.email, 'success' );
        return true;

      } ), catchError( error => {

        // console.error( error );
        Swal.fire( error.error.mensaje, error.error.errors.message, 'error' );
        throw error;        

      } ) );

  }

  borrarUsuario( id: string ) {

    let url = `${ environment.url }/usuario/${ id }?token=${ this.token }`;

    return this.http.delete( url );

  }

  login( usuario: Usuario, recuerdame: boolean = false ) {

    if( recuerdame ) { // si esta tildado el recuerdame

      // grabar el email en localstorage
      localStorage.setItem( 'email', usuario.email );

    } else { // si no esta tildado el recuerdame

      // borra el email del localstorage
      localStorage.removeItem( 'email' );

    }

    let url = environment.url + '/login'

    return this.http.post( url, usuario )
      .pipe( map( ( respuesta: any ) => {

        this.guardarStorage( respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu );
        return true;

      } ), catchError( error => {

        //console.error( 'My Error: ', error.error.mensaje );
        Swal.fire( 'Error', error.error.mensaje, 'error' );
        throw error;        

      } ) );

  }

  logout() {

    this.usuario = null;
    this.token   = '';
    this.menu    = [];

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    localStorage.removeItem( 'menu' );

    this.router.navigateByUrl( '/login' );

  }

  loginGoogle( token: string ) {

    let url = environment.url + '/login/google';

    return this.http.post( url, { token: token } )
      .pipe( map( ( respuesta: any ) => {

        this.guardarStorage( respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu );
        return true;

      } ) );

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );
    localStorage.setItem( 'menu', JSON.stringify( menu ) );

    this.usuario = usuario;
    this.token   = token;
    this.menu    = menu;

  }

  cargarStorage() {

    if( localStorage.getItem( 'token' ) ) {

      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
      this.menu    = JSON.parse( localStorage.getItem( 'menu' ) );

    } else {

      this.token = '';
      this.usuario = null;
      this.menu    = null;

    }

  }

  estaLogueado() {

    return ( this.token.length > 5 ) ? true : false;

  }

  cambiarImagen( archivo: File, id: string ) {

    this.uploadService.subirArchivo( archivo, 'usuarios', id )
      .then( ( respuesta: any ) => {

        //console.log( respuesta );
        this.usuario.img = respuesta.usuario.img;

        Swal.fire( 'Imagen actualizada', this.usuario.email, 'success' );

        this.guardarStorage( id, this.token, this.usuario, this.menu );

      } )
      .catch( error => {

        console.error( error );

      } );

  }

  renovarToken() {

    let url = `${ environment.url }/login/renovarToken?token=${ this.token }`;

    return this.http.get( url )
      .pipe( map( ( respuesta: any ) => {

        this.token = respuesta.token;
        localStorage.setItem( 'token', this.token );

        console.log( 'token renovado' );

        return true;

      } ), catchError( error => {

        Swal.fire( 'Error de token', 'Error al intentar renovar el token', 'error' );
        this.router.navigateByUrl( '/login' );

        throw error;        

      } ) );

  }

}
