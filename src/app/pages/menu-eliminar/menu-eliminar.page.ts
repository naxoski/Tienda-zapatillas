import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-eliminar',
  templateUrl: './menu-eliminar.page.html',
  styleUrls: ['./menu-eliminar.page.scss'],
})
export class MenuEliminarPage implements OnInit {
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
    },
  ];
  public alertButtons1 = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
