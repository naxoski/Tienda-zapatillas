import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito: any[] = []; 
  detallesVenta: any[] = [];
  informacionVenta: any = {};
  ventaData: any = {}; // Inicializar con un objeto vacío
  constructor(private db: DbservicesService, private router: Router,private navCtrl: NavController,private route: ActivatedRoute) {}
  
  ngOnInit() {
  
  }
  ionViewWillEnter() {
    // Obtener el ID de la venta actual (por ejemplo, desde el local storage o de algún otro lugar donde lo hayas guardado)
    const idVenta = 1; // Reemplaza esto con la forma correcta de obtener el ID de la venta actual

    // Obtener detalles de la venta
    this.db.obtenerDetallesVenta(idVenta).then(detalles => {
      this.detallesVenta = detalles;
    }).catch(error => {
      console.error('Error al obtener detalles de la venta:', error);
    });

    // Obtener información de la venta
    this.db.obtenerVenta(idVenta).then(venta => {
      this.informacionVenta = venta;
    }).catch(error => {
      console.error('Error al obtener información de la venta:', error);
    });
  }
}
