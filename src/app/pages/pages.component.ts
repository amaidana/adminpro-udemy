import { Component, OnInit } from '@angular/core';

declare function int_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	int_plugins();

  }

}
