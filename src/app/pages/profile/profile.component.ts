import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';

import { UsuarioService } from '../../services/usuario/usuario.service';

// para mostrar alerts
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

	usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: any;

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit() {

  	this.usuario = this.usuarioService.usuario;

  }

  guardarPerfil( usuario: Usuario ) {

  	this.usuario.nombre = usuario.nombre;

  	if( !this.usuario.google ) {

  		this.usuario.email = usuario.email;

  	}

  	this.usuarioService.actualizarUsuario( this.usuario )
  		.subscribe( ( respuesta: any ) => {

  			//console.log( respuesta );

  		} );

  }

  // =================================================
  // se ejecuta cuando se selecciona un archivo
  // =================================================
  seleccionImagen( archivo: File ) {

    if( !archivo ) {

      this.imagenSubir = null;
      return;

    }

    if( archivo.type.indexOf( 'image' ) < 0 ) {

      Swal.fire( 'Advertencia', 'El archivo seleccionado no es una imagen.', 'error' );

      this.imagenSubir = null;
      return;

    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    //let urlTemp = reader.readAsDataURL( archivo );
    reader.readAsDataURL( archivo );

    reader.onloadend = () => {

      this.imagenTemporal = reader.result;

    }

    //console.log( archivo );

  } 

  cambiarImagen() {

    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
