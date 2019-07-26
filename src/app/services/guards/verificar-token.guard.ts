import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements  CanActivate{
  
  constructor( private usuarioService: UsuarioService,
  						 private router: Router ) {}

  canActivate(): Promise<boolean> | boolean {

  	let token = this.usuarioService.token;

  	// recuperar el contenido del token
  	// atob decodifica en base 64
  	let payload = JSON.parse( atob( token.split( '.' )[1] ) );

  	// fecha de expiración del token expresada en segundos
  	let fechaExp = payload.exp;
  	let tokenExpirado = this.tokenExpirado( fechaExp );

  	if( tokenExpirado ){

  		this.router.navigateByUrl( '/login' );
  		return false; // regresa boolean false

  	}

  	// renovar el token si está proximo a vencer

  	return this.tokenRenovar( fechaExp );

  }


  // =====================================
  // Verifica si hay que renovar el token
  // =====================================
  tokenRenovar( fechaExp: number ): Promise<boolean> {

  	return new Promise( ( resolve, reject ) => {

  		// fecha de expiración del token en milisegundos
  		let tokenExp = new Date( fechaExp * 1000 );

  		// momento actual en milisegundos
  		let ahora = new Date();

  		// sumar una hora al momento actual
  		ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

  		// verificar si falta una hora para que expire el token
  		if( tokenExp.getTime() > ahora.getTime() ) {

  			resolve( true );

  		} else { // el token está proximo a vencer y hay que renovarlo

  			this.usuarioService.renovarToken()
  				.subscribe( () => {

  					resolve( true );

  				}, () => { // si sucede un error

  					this.router.navigateByUrl( '/login' );
  					reject( false );

  				} );

  		}

  	} );

  }


  // =====================================
  // Verifica si el token expiró
  // =====================================
  tokenExpirado( fechaExp: number ) {

  	// obtener el momento actual en segundos
  	let ahora = new Date().getTime() / 1000;

  	if( fechaExp < ahora ) { // expiró el token

  		return true;

  	} else { // no expiró el token

  		return false;

  	}

  }

}
