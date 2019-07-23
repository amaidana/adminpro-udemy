import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

	usuarios: Usuario[] = [];
	medicos: Medico[] = [];
	hospitales: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
  						 private http: HttpClient,
               private router: Router ) {

  	activatedRoute.params
  		.subscribe( params => {

  			let termino = params['termino'];
  			this.buscar( termino );

  		} );

  }

  ngOnInit() {
  }

  buscar( termino: string ) {

  	let url = `${ environment.url }/busqueda/todo/${ termino }`;

  	this.http.get( url )
  		.subscribe( respuesta => {

  			console.log( respuesta );
  			this.usuarios = respuesta['usuarios'];
  			this.medicos  = respuesta['medicos'];
  			this.hospitales = respuesta['hospitales'];

  		} );

  }

  edit( tipo: string, id: string ) {

    let redireccionar = `/${ tipo }`;

    this.router.navigate( [ redireccionar, id ] );

  }

}
