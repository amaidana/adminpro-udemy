import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

	titulo: string;

  constructor( private router: Router,
  						 private title: Title,
               private meta: Meta ) {


		this.getDataRoute()
			.subscribe( resp => {

				//console.log( resp );
				this.titulo = resp.titulo;
				this.title.setTitle( this.titulo );

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo
        };

        this.meta.updateTag( metaTag );

			} );

  }

  ngOnInit() {
  }

  getDataRoute() {

  	return this.router.events
  		.pipe(

  			// si evento es una instancia de ActivationEnd me muestra esos solo
  			filter( evento => evento instanceof ActivationEnd ),
  			// si firstChild es null me muestra solo ese
  			filter( ( evento: ActivationEnd ) => evento.snapshot.firstChild === null ),
  			// solo muestro el data
  			map( ( evento: ActivationEnd ) => evento.snapshot.data )

			)

  }

}
