import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

// Interfaz para detalles de venta
interface DetalleVenta {
  cantidad: number;
  detalle: string;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {


  constructor(private db: DbservicesService, private router: Router, private navCtrl: NavController, private route: ActivatedRoute, public toastController: ToastController, private alertController: AlertController) {}

  ngOnInit() {

  }


}


