import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService} from 'src/app/services/dbservices.service';
import { Zapatillas } from 'src/app/services/zapatillas';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  private idsuario : any;

  arregloZapatillas: any = [
    {
      idproducto: '',
      nombreproducto: '',
      descripcion: '',
      precio: '',
      stock: '',
      foto: '',
      idcategoria: ''
      
    }

  ]


  constructor(private db: DbservicesService, private router: Router) { }

  ngOnInit() {
      //subscribo al observable de la BD
      this.db.dbState().subscribe(res=>{
        if(res){
          this.db.fetchProducto().subscribe(datos=>{
            this.arregloZapatillas = datos;
          })
        }
       })
  }


}
