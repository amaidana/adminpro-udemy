import { Component, OnInit } from '@angular/core';

declare function int_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {

	anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {

  	int_plugins();

  }

}
