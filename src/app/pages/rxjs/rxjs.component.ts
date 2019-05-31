import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

	subscription: Subscription;

  constructor() {

		this.subscription = this.regresaObservable()
			 //.pipe( retry( 2 ) )
  		 .subscribe( 
  			 numero => console.log( 'Subs: ', numero ),
  			 error => console.error( 'Error en el observable: ', error ),
  			 () => console.log( 'El observabable terminó' )
  		 );

  }

  ngOnInit() {
  }

  ngOnDestroy() {

  	console.log( 'Me fuí de la página Rxjs.' );
  	this.subscription.unsubscribe();

  }

  regresaObservable(): Observable<any> {

  	return new Observable( ( observer: Subscriber<any> ) => {

  		let contador = 0;

  		let intervalo = setInterval( () => {

  			contador += 1;

  			const salida = {
  				valor: contador
  			}

  			observer.next( salida );

  			/*
  			if( contador === 3 ) {

  				clearInterval( intervalo );
  				observer.complete();

  			}
				*/

  			/*
  			if( contador === 2 ) {

  				//clearInterval( intervalo );
  				observer.error( 'Ha ocurrido un error en el observable' );

  			}
				*/

  		}, 1000 );

  	} ).pipe( 
  		map( resp => resp.valor ),
  		filter( ( resp, index ) => {

  			//console.log( 'Filter: ', resp, index );

  			if( ( resp % 2 ) === 0 ) { // es un numero par

  				return false;

  			} else { // es un numero impar

  				return true;

  			}

  		} )
  	);

  }

}
