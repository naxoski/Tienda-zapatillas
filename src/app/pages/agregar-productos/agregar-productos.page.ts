import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.page.html',
  styleUrls: ['./agregar-productos.page.scss'],
})
export class AgregarProductosPage implements OnInit {
  nombreProductos = "";
  descripcionProducto = "";

  constructor(public router:Router, private db: DbservicesService) { }

  insertar(){
    try {
    this.db.insertarZapatilla(this.nombreProductos,this.descripcionProducto);
    this.db.presentAlert("Zapatillas Agregada");
    this.router.navigate(['/ver-productos']);
    } catch (error) {
      this.db.presentAlert("Zapatillas no agregada"); 
    }
  }
  ngOnInit() {
  }

}
