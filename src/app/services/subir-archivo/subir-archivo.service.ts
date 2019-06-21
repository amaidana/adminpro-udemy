import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {

  	return new Promise( ( resolve, reject ) => {

	  	let formData = new FormData();
	  	let xhr = new XMLHttpRequest();

	  	formData.append( 'imagen', archivo, archivo.name );

	  	xhr.onreadystatechange = function() {

	  		if( xhr.readyState === 4 ) { // cuando termine el proceso

	  			if( xhr.status === 200 ) { // la imagen se subió

	  				console.log( 'Imagen subida correctamente.' );
	  				resolve( JSON.parse( xhr.response ) );

	  			} else { // la imagen no se subió

	  				console.log( 'No se subió la imagen.' );
	  				reject( xhr.response );

	  			}

	  		}

	  	}

	  	let url = environment.url + '/upload/' + tipo + '/' + id;

	  	xhr.open( 'PUT', url, true );
	  	xhr.send( formData );

  	} );

  }

}
