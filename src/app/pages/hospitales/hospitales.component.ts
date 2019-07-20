import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { Hospital } from '../../models/hospital.model';

// para mostrar alerts
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

	cargando: boolean = true;
	
  limit: number = 12;
  numRows: number = 0;

	hospitales: Hospital[] = [];

  constructor( private hospitalService: HospitalService,
               private modalUploadService: ModalUploadService ) { }

  ngOnInit() {

  	this.read();

    // cuando la notificación reciba algo => recarga la grilla
    // se podria recibir el hospital .subcribe( hospital ) y actualizar solo ese hospital en el arreglo de hospitales
    this.modalUploadService.notificacion
      .subscribe( () => this.read() );

  }

  obtenerHospital( id: string ) {

  }

  //================================
  // Para llamar al método de buscar
  //================================
  search( termino: string ) {

    if( termino.length < 3 ) {

      this.read();
      return;

    }

    this.hospitalService.getRecordsFiltered( termino )
      .subscribe( respuesta => {

        this.hospitales = respuesta.hospitales;
        //this.numRows = respuesta.numRows;

      } );

  }

  //================================
  // Para mostrar el formulario
  //================================
  add() {

    Swal.fire( {
      title: 'Agregar hospital',
      text: 'Nombre del hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Grabar', 
      cancelButtonText: 'Cancelar'
    } ).then( data => {

      this.cargando = true;

      if( !data.value || data.value.length === 0 ) {

        this.cargando = false;
        return;

      }
      
      let val = { nombre: data.value };
      this.create( val );

    } );

  }

  //==================================
  // Para llamar al método de insertar
  //==================================
  create( data ) {

    this.hospitalService.insertNewRecord( data )
      .subscribe( respuesta => {

        this.read();
        this.cargando = false;
        Swal.fire( 'Creado', data.nombre + ' fué creado con éxito.', 'success' );

      } );

  }


  //===========================================
  // Para llamar al método de obtener registros
  //===========================================
  read( start: number = 0 ) {

    this.hospitalService.getAllRecords( start, this.limit )
      .subscribe( ( respuesta: any ) => {

        // console.log( respuesta );

        this.hospitales = respuesta.hospitales;
        this.numRows = respuesta.numRows;

        this.cargando = false;

      } );

  }


  //=====================================
  // Para llamar al método de actualizar
  //=====================================
  update( hospital: Hospital ) {

    this.hospitalService.updateRecord( hospital )
      .subscribe( () => Swal.fire( 'Actualizado',  hospital.nombre + ' fué actualizado con éxito.', 'success' ) );

  }


  //==================================
  // Para llamar al método de eliminar
  //==================================
  delete( hospital: Hospital ) {

    this.cargando = true;

    this.hospitalService.deleteRecord( hospital._id )
      .subscribe( respuesta => {

        this.read();
        Swal.fire( 'Borrado', hospital.nombre + ' fué eliminado con éxito.', 'success' );

      } );

  }

  actualizarImagen( hospital: Hospital ) {

    this.modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

}
