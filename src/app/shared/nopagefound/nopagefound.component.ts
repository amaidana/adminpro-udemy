import { Component, OnInit } from '@angular/core';

declare function int_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	int_plugins();

  }

}
