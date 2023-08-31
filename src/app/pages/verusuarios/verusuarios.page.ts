import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.page.html',
  styleUrls: ['./verusuarios.page.scss'],
})
export class VerusuariosPage implements OnInit {
  
  lista : any = [
    {
      nombre : "Ignacio",
      apellido :"Huerta",
      categoria:"usuario",
      edad : 20,

    },
    {
      nombre : "Diego",
      apellido :"Espejo",
      categoria: "Admin",
      edad : 20,

    }

  ]

  constructor() { 

  }

  ngOnInit() {
  }

}
