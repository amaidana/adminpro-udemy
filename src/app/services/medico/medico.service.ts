import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';

import { UsuarioService } from '../../services/usuario/usuario.service';

import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient,
               private usuarioService: UsuarioService ) { }

  //===================================
  // Obtener todos los resultados
  //===================================
  getAllRecords() {

  	let url = `${ environment.url }/medico`;

  	return this.http.get( url )
      .pipe( map( respuesta => respuesta ) );

  }

  //===================================
  // Obtener resultados filtrados
  //===================================
  getRecordsFiltered( content: string ) {

    let url = environment.url + `/busqueda/coleccion/medicos/${ content }`;

    return this.http.get( url )
      .pipe( map( ( respuesta: any ) => {

        console.log( respuesta );
        return respuesta;
    
      } ) );

  }

  //===================================
  // Obtener un registro por el id
  //===================================
  getRecordById( id: string ) {

    let url = environment.url + '/medico/' + id;

    return this.http.get( url )
      .pipe( map( ( respuesta: any ) => respuesta.medico ) );

  }

  //===================================
  // Insertar nuevo registro
  //===================================
  insertNewRecord( data: Medico ) {

    let url = environment.url + '/medico' + '/?token=' + this.usuarioService.token;

    return this.http.post( url, data )
      .pipe( map( ( respuesta: any ) => {

        return respuesta.medico;

      } ) );

  }

  //===================================
  // Actualizar registro
  //===================================
  updateRecord( data: Medico ) {

    let url = `${ environment.url }/medico/${ data._id }?token=${ this.usuarioService.token }`;

    return this.http.put( url, data )
      .pipe( map( ( respuesta: any ) => {

        return respuesta.medico;

      } ) );

  }

  //===================================
  // Eliminar registro
  //===================================
  deleteRecord( id: string ) {

    let url = environment.url + '/medico/' + id + '?token=' + this.usuarioService.token;

    return this.http.delete( url )
      .pipe( map( ( respuesta: any ) => respuesta.hospitales ) );

  }

}
