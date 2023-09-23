import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras} from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';



@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.page.html',
  styleUrls: ['./ver-productos.page.scss'],
})
export class VerProductosPage implements OnInit {

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
    modificar(x:any){
      let navigationExtras: NavigationExtras = {
        state: {
          idEnviado:x.idproducto,
          nombreEnviado: x.nombreproducto,
          descripcionEnviada: x.descripcion,
          precioEnviado: x.precio,
          stockEnviado: x.stock,
          fotoEnviada : x.foto,
          categoriaEnvidia: x.idcategoria


        }
      }
      this.router.navigate(['/modificar'],navigationExtras);
    }

    eliminar(x:any){
      this.db.eliminarProducto(x.idproducto);
      this.db.presentAlert("Zapatilla Eliminada");
    }

}
