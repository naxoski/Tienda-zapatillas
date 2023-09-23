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
      id_producto: '',
      nombreProducto: '',
      descripcion: ''
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
          idEnviado:x.id_producto,
          nombreEnviado: x.nombreProducto,
          descripcionEnviada: x.descripcion,


        }
      }
      this.router.navigate(['/modificar'],navigationExtras);
    }

    eliminar(x:any){
      this.db.eliminarProducto(x.idproducto);
      this.db.presentAlert("Zapatilla Eliminada");
    }

}
