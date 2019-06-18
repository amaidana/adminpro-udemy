export class Usuario {

	constructor( public nombre: string, 
							 public email: string,
							 public password: string,
							 public img?: string, // parametro opcional
							 public role?: string, // despues del 1er opcional el resto debe ser opcional
							 public google?: boolean,
							 public id?: string ) {}

}