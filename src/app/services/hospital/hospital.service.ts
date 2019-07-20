import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { UsuarioService } from '../../services/usuario/usuario.service'; 

import { Hospital } from '../../models/hospital.model';
 
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient,
  						 private usuarioService: UsuarioService ) { }

  //===================================
  // Obtener todos los resultados
  //===================================
  getAllRecords( start: number = 0, limit: number = 12 ) {

  	let url = `${ environment.url }/hospital?start=${ start }&limit=${ limit }`;

  	return this.http.get( url )
      .pipe( map( respuesta => respuesta ) );

  }

  //===================================
  // Obtener resultados filtrados
  //===================================
  getRecordsFiltered( termino: string ) {

    let url = environment.url + `/busqueda/coleccion/hospitales/${ termino }`;

    return this.http.get( url )
      .pipe( map( ( respuesta: any ) => {

        return respuesta;
    
      } ) );

  }

  //===================================
  // Obtener un registro por el id
  //===================================
  getRecordById( id: string ) {

  	let url = environment.url + '/hospital/' + id;

  	return this.http.get( url )
  		.pipe( map( ( respuesta: any ) => respuesta.hospital ) );

  }

  //===================================
  // Insertar nuevo registro
  //===================================
  insertNewRecord( data: Hospital ) {

  	let url = environment.url + '/hospital/' + '?token=' + this.usuarioService.token;

    let nombre = data.nombre;

  	return this.http.post( url, { nombre } )
  		.pipe( map( ( respuesta: any ) => {

  			return respuesta.hospital;

  		} ) );

  }

  //===================================
  // Actualizar registro
  //===================================
  updateRecord( hospital: Hospital ) {

  	let url = environment.url + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token;

  	return this.http.put( url, hospital )
  		.pipe( map( ( respuesta: any ) => respuesta.hospital ) );

  }

  //===================================
  // Eliminar registro
  //===================================
  deleteRecord( id: string ) {

    let url = environment.url + '/hospital/' + id + '?token=' + this.usuarioService.token;

    return this.http.delete( url )
      .pipe( map( ( respuesta: any ) => respuesta.hospitales ) );

  }

}
