import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

	public tipo: string; // usuario, médico u hospital
	public id: string; // id de usuario, médico u hospital

	public oculto: string = 'oculto'; // indica si esta oculto el modal

  // para notificar a los componentes que usan este servicio, que ya se subió la imagen
	public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {

  	this.oculto = 'oculto' // ocultar el modal

  	this.tipo = null;
  	this.id = null;

  }

  mostrarModal( tipo: string, id: string ) {

  	this.oculto = ''; // mostrar el modal

  	this.tipo = tipo; // usuario, médico u hospital
  	this.id = id; // id de usuario, médico y hospital

  }

}
