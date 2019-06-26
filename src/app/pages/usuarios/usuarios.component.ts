import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// para mostrar alerts
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

	cargando: boolean = true;
	usuarios: Usuario[] = [];
	desde: number = 0;
	numRows: number = 0;

  constructor( private usuarioService: UsuarioService,
               private modalUploadService: ModalUploadService ) { }

  ngOnInit() {

  	this.cargarUsuarios();

    // suscribirse al servicio de notificaciones
    this.modalUploadService.notificacion
      .subscribe( respuesta => this.cargarUsuarios() );

  }

  cargarUsuarios() {

  	this.cargando = true;

  	this.usuarioService.cargarUsuarios( this.desde )
  		.subscribe( ( respuesta: any ) => {

  			//console.log( respuesta );
  			this.usuarios = respuesta.usuarios;
  			this.numRows = respuesta.numRows;

  			this.cargando = false;

  		} );

  }

  buscarUsuario( termino: string ) {

    if( termino.length < 3 ) {

    	this.cargarUsuarios();
      return;
      
    }

  	this.cargando = true;

  	this.usuarioService.buscarUsuarios( termino )
  		.subscribe( ( respuesta: Usuario[] ) => {

  			console.log( respuesta );

  			this.usuarios = respuesta;

  			this.cargando = false;

  		} );

  }

  cambiarDesde( valor: number ) {

  	let desde = this.desde + valor;

  	//console.log( desde );

  	if( desde >= this.numRows ) {

  		return;

  	}

  	if( desde < 0 ) {

  		return;

  	}

  	this.desde += valor;
 		this.cargarUsuarios();
  	
  }

  borrarUsuario( usuario: Usuario ) {

    // console.log( usuario );

    if( usuario._id === this.usuarioService.usuario._id ) {

    	Swal.fire( 'Error', 'No puede borrar su usuario', 'error' );
    	return;

    }

    Swal.fire( {

    	title: 'Eliminar usuario',
    	text: "¿Está seguro que desea eliminar este usuario?",
    	type: 'warning',
    	showCancelButton: true,
    	confirmButtonColor: '#3085d6',
    	cancelButtonColor: '#d33',
    	confirmButtonText: 'Si',
    	cancelButtonText: 'No'

    } ).then( ( respuesta ) => {

    	if( respuesta.value === true ) {

    		this.usuarioService.borrarUsuario( usuario._id )
    			.subscribe( ( respuesta: any ) => {

    				console.log( respuesta );
    				this.cargarUsuarios();

    				Swal.fire( 'Usuario borrado', 'El usuario se ha borrado con éxito', 'success' );

    			} );

    	}

    } );

  }

  guardarUsuario( usuario: Usuario ) {

  	this.usuarioService.actualizarUsuario( usuario )
  		.subscribe();

  }

  mostrarModal( id: string ) {

    this.modalUploadService.mostrarModal( 'usuarios', id );

  }

}
