import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// servicio de usuario
import { UsuarioService } from '../services/usuario/usuario.service';

// modelo de usuario
import { Usuario } from '../models/usuario.model';

// para usar el google signin
declare const gapi: any;


declare function int_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any; // objeto singin

  constructor( private router: Router,
               private usarioService: UsuarioService ) { }

  ngOnInit() {

  	int_plugins();

    this.googleInit();

    this.email = localStorage.getItem( 'email' ) || '';

    if( this.email ) {

      this.recuerdame = true;

    }

  }

  // ===========================================
  // Inicialización del plugin de Google signin
  // ===========================================
  googleInit() {

    gapi.load( 'auth2', () => {

      this.auth2 = gapi.auth2.init( {

        client_id: '973889748934-8srt4t17k5dmhlmbm9doe342l2s74bpf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'

      } );

      // dar al botón la funcionalidad para que abra el pop up signin de google
      this.attachSignin( document.getElementById( 'btnGoogle' ) );

    } );

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, ( googleUser ) => {

      // obtener el profile
      //let profile = googleUser.getBasicProfile();

      // obtener el token
      let token = googleUser.getAuthResponse().id_token;

      this.usarioService.loginGoogle( token )
        .subscribe( () => window.location.href = '#/dashboard' );

    } );

  }

  ingresar( forma: NgForm ) {

    if( forma.invalid ) {

      return;

    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );

    this.usarioService.login( usuario, forma.value.recuerdame )
      .subscribe( () => this.router.navigateByUrl( '/dashboard' ) );

    //console.log( forma.valid );
    //console.log( forma.value );
  	//this.router.navigateByUrl( '/dashboard' );

  }

}
