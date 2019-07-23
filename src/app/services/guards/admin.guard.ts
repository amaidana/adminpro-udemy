import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

	constructor( private usuarioService: UsuarioService ) {}

	canActivate() {

		if( this.usuarioService.usuario.role === 'ADMIN_ROLE' ) {

			return true;

		}

		this.usuarioService.logout();
		return false;

	}  

}
