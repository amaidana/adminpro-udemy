import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

	cargando: boolean = true;
	numRows: number = 0;
	medicos: Medico[] = [];

  constructor( private medicoService: MedicoService,
               private router: Router ) { }

  ngOnInit() {

  	this.read();

  }

  //===========================================
  // Para llamar al método de obtener registros
  //===========================================
  read() {

    this.medicoService.getAllRecords()
      .subscribe( ( respuesta: any ) => {

        //console.log( respuesta );

        this.medicos = respuesta.medicos;
        this.numRows = respuesta.numRows;

        this.cargando = false;

      } );

  }

  //================================
  // Para llamar al método de buscar
  //================================
  search( content: string ) {

    if( content.length < 3 ) {

      this.read();
      return;

    }

    this.medicoService.getRecordsFiltered( content )
      .subscribe( respuesta => {

      	//console.log( respuesta );

        this.medicos = respuesta.medicos;
        //this.numRows = respuesta.numRows;

      } );

  }

  //=============================================
  // Para mostrar el formulario agregar o editar
  //=============================================
  form( id: string = 'nuevo' ) {

    this.router.navigate( [ '/medico', id ] );

  }

  //==================================
  // Para llamar al método de eliminar
  //==================================
  delete( medico: Medico ) {

    Swal.fire( { 
      title: 'Eliminar registro',
      text: "¿Está seguro que desea eliminar este registro?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    } ).then( ( result ) => {

      if( result.value ) {

        this.cargando = true;
    
        this.medicoService.deleteRecord( medico._id )
          .subscribe( respuesta => {

            this.read();
            Swal.fire( 'Borrado', medico.nombre + ' fué eliminado con éxito.', 'success' );

          } );
      
      }
    
    } );

  }

}
