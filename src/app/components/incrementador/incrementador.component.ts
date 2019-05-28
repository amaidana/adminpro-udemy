import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

	@Input() progreso: number = 50;
	@Input( 'nombreInput' ) leyenda: string = 'Leyenda';

	@Output( 'nombreOutput' ) cambioValor: EventEmitter<number> = new EventEmitter();

	@ViewChild( 'txtProgress' ) txtProgress: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  cambiarValor( valor: number ) {

  	let porcentaje = this.progreso + valor;

  	if( porcentaje > 100 ) {

  		porcentaje = 100;

  	}

  	if( porcentaje < 0 ) {

  		porcentaje = 0;

  	}

  	this.progreso = porcentaje;

  	this.cambioValor.emit( this.progreso );

  	this.txtProgress.nativeElement.focus();

  }

  onChange( newValue: number ) {

  	//let elementoHTML: any = document.getElementsByName( 'progreso' )[0];
  	//console.log( this.txtProgress );

  	if( newValue > 100 ) {

  		this.progreso = 100;

  	} else if( newValue < 0 ) {

  		this.progreso = 0;

  	} else {

  		this.progreso = newValue;

  	}

  	//elementoHTML.value = Number( this.progreso );

  	this.txtProgress.nativeElement.value = this.progreso;

  	this.cambioValor.emit( this.progreso );

  }

}
