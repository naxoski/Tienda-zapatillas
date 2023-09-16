import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.page.html',
  styleUrls: ['./agregar-productos.page.scss'],
})
export class AgregarProductosPage implements OnInit {
  nombreProducto = "";
  descripcionProducto = "";
  precioProducto = "";
  stockProducto = "";

  constructor(public router:Router, private db: DbservicesService) { }

  insertar(){
    this.db.insertarZapatilla(this.nombreProducto,this.descripcionProducto,this.precioProducto,this.stockProducto);
    this.router.navigate(['/ver-productos']);
  }
  ngOnInit() {
  }

}
