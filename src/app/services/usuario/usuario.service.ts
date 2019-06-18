import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

// modelo de usuario
import { Usuario } from '../../models/usuario.model';

// contiene la ruta del backend
import { environment } from '../../../environments/environment'

// para mostrar alerts
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( private http: HttpClient,
               private router: Router ) {

    this.cargarStorage();

  }

  crearUsuario( usuario: Usuario ) {

  	let url = environment.url + '/usuario';

  	return this.http.post( url, usuario )
  		.pipe( map( ( respuesta: any ) => {

  			Swal.fire( 'Nuevo usuario', usuario.email, 'success' );
  			return respuesta.usuario;

  		} ) );

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
        
        this.guardarStorage( respuesta.id, respuesta.token, usuario );
        return true;

      } ) );

  }

  logout() {

    this.usuario = null;
    this.token = '';

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );

    this.router.navigateByUrl( '/login' );

  }

  loginGoogle( token: string ) {

    let url = environment.url + '/login/google';

    return this.http.post( url, { token: token } )
      .pipe( map( ( respuesta: any ) => {

        this.guardarStorage( respuesta.id, respuesta.token, respuesta.usuario );
        return true;

      } ) );

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;

  }

  cargarStorage() {

    if( localStorage.getItem( 'token' ) ) {

      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );

    } else {

      this.token = '';
      this.usuario = null;

    }

  }

  estaLogueado() {

    return ( this.token.length > 5 ) ? true : false;

  }

}
