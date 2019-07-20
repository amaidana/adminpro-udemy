import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

	hospitales: Hospital[] = [];
	medico: Medico = new Medico( '', '', '', '', '' );
	hospital: Hospital = new Hospital( '' );

  constructor( private medicoService: MedicoService,
  						 private hospitalService: HospitalService,
  						 private activatedRoute: ActivatedRoute,
  						 private router: Router,
               private modalUploadService: ModalUploadService ) { }

  ngOnInit() {

    //====================================
    // Para inicializar el formulario
    //====================================
    this.activatedRoute.params
      .subscribe( params => {

        this.medico._id = params['id'];
        this.form();

      } );

    //====================================
    // Para llenar el combo de hospitales
    //====================================
  	this.hospitalService.getAllRecords()
  		.subscribe( ( respuesta: any ) => {

  			this.hospitales = respuesta.hospitales;

  		} );


    // cuando la notificación reciba algo => recarga la grilla
    // se podria recibir el hospital .subcribe( hospital ) y actualizar solo ese hospital en el arreglo de hospitales
    this.modalUploadService.notificacion
      .subscribe( respuesta => {

        //console.log( respuesta );
        this.medico.img = respuesta.medico.img;

      } );

  }

  //======================================
  // Para cargar los datos del formulario
  //======================================
  form() {

    if( this.medico._id === 'nuevo' ) {

      return;

    }

    this.medicoService.getRecordById( this.medico._id )
      .subscribe( respuesta =>{ 

        this.medico = respuesta
        this.medico.hospital = respuesta.hospital._id;

        this.infoHospital( this.medico.hospital );

      } );

  }

  save( f: NgForm ) {

  	if( !f.valid ) { // si el formulario no es válido => no hace nada

  		return;

  	}

  	if( this.medico._id === 'nuevo' ) { // si es agregar un nuevo registro

  		this.create( f );

  	} else { // si es editar un registro

  		this.update( f );

  	}
  	
  }

  //==================================
  // Para llamar al método de insertar
  //==================================
  create( f: NgForm ) {

    this.medicoService.insertNewRecord( this.medico )
      .subscribe( respuesta => {

        //this.read();
        //this.cargando = false;
        Swal.fire( 'Creado', this.medico.nombre + ' fué creado con éxito.', 'success' );

        this.medico._id = respuesta._id;
        this.router.navigate( [ '/medico', respuesta._id ] );

      } );

  }

  //=====================================
  // Para llamar al método de actualizar
  //=====================================
  update( f: NgForm ) {

    this.medicoService.updateRecord( this.medico )
      .subscribe( respuesta => {

        Swal.fire( 'Actualizado', this.medico.nombre + ' fué actualizado con éxito', 'success' );

      } );

  }

  //=====================================
  // Para mostrar la imagen del hospital
  //=====================================
  infoHospital( id: string ) {

  	this.hospitalService.getRecordById( id )
  		.subscribe( respuesta => this.hospital = respuesta );

  }

  //============================================================
  // Para mostrar el formulario para cambiar la foto del medico
  //============================================================
  cambiarFoto() {

    this.modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }

}
