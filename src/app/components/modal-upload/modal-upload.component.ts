import { Component, OnInit } from '@angular/core';

import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

// para mostrar alerts
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemporal: any;

  constructor( private subirArchivoService: SubirArchivoService,
  						 private modalUploadService: ModalUploadService ) { }

  ngOnInit() {
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

  subirImagen() {

  	this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id )
  		.then( respuesta => {

        // console.log( respuesta );

        // emitir respuesta al componente desde el servicio
  			this.modalUploadService.notificacion.emit( respuesta );
        // cerrar el modal
        this.cerrarModal();

  		} )
  		.catch( error => {

  			console.error( 'Error en la carga' );

  		} );

  }

  cerrarModal() {

    // para que la próxima vez que abra el modal, aparezca vacio por default
  	this.imagenTemporal = null;
  	this.imagenSubir = null;

    // ocultar el modal
  	this.modalUploadService.ocultarModal();

  }

}
