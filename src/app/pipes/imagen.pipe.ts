import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {

	// recibo como parametro la imagen
	// y el tipo (usuario, hospital ó médico)
  transform( img: string, tipo: string = 'usuario' ): any {

  	let url = environment.url + '/img';

  	if( !img ) {

  		// el servidor devolvera la imagen de "no image"
  		return url + '/usuarios/xxx';

  	}

    // si viene un https asumo que es una imagen de google
    if( img.indexOf( 'https' ) >= 0 ) {

      return img;

    }

  	switch( tipo ) {

  		case 'usuario':
  			
				url += '/usuarios/' + img;

  			break

  		case 'hospital':
				
				url += '/hospitales/' + img;

  			break;

  		case 'medico':

  			url += '/medico/' + img;

  			break;

  		default:

  			console.log( 'tipo de usuario inexistente.' );
  			url += '/usuarios/xxx';

  	}

    return url;

  }

}
