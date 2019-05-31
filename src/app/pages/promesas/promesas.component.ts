import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

  	this.contarTres().then(
  		mensaje => console.log( 'Terminó promesa correctamente!', mensaje )
		)
		.catch( error => console.error( 'Error en la promesa', error ) );

  }

  ngOnInit() {
  }

  contarTres(): Promise<string> {

  	// cuando un intervalo de tiempo ya cumple 3 segundos?

  	return new Promise( ( resolve, reject ) => {
  		
  		let contador = 0;

  		let intervalo = setInterval( () => {

  			contador += 1;
  			console.log( contador );

				if( contador === 3 ) {

					resolve( 'resolve() dice: Todo ha salido bien.' );
					//reject( 'reject() dice: Algo ha fallado aquí.' );
					clearInterval( intervalo );

				}

  		}, 1000 );

  	} );

  }

}
