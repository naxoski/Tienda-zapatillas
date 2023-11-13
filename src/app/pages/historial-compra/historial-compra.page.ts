import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.page.html',
  styleUrls: ['./historial-compra.page.scss'],
})
export class HistorialCompraPage implements OnInit {
  idUser: any ;
  venta: any =[{idventa:'',fventa:'',fdespacho:'',estatus:'',total:'',carrito:'',idusuario:''}];
  detalles:any =[{iddetalle:'',cantidad:'',detalle:'',idproducto:'',idventa:'',nombreproducto:'', precio:'',stock:'',foto:''}];

  constructor(private db: DbservicesService, private router: Router, private navCtrl: NavController, private route: ActivatedRoute, public toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
    this.idUser = localStorage.getItem('idusuario')
    this.db.fetchDetalleComprado().subscribe(datos => {
      this.detalles = datos;
    });

   
  }

  async Historial(){
    for(let x of this.detalles){
      console.log("Id del detalle: "+x.iddetalle);
      console.log("Cantidad:"+x.cantidad);
      console.log("Detalle: "+x.detalle);
      console.log("Id del producto: "+x.idproducto);
      console.log("Id de la venta: "+x.idventa);
      console.log("Nombre del  producto: "+x.nombreproducto);
      console.log("Precio: "+x.precio);
      console.log("Stock: "+x.stock);
      await this.db.obtenerHistorial(x.idUser);


    }
  }

}
