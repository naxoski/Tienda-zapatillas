import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { Detallecomprado } from 'src/app/services/detallecomprado';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.page.html',
  styleUrls: ['./historial-compra.page.scss'],
})
export class HistorialCompraPage implements OnInit {
  idUser: any;
  venta: any =[{idventa:'',fventa:'',fdespacho:'',estatus:'',total:'',carrito:'',idusuario:''}];
  detalles:any =[{iddetalle:'',cantidad:'',detalle:'',idproducto:'',idventa:'',nombreproducto:'', precio:'',stock:'',foto:''}];
  historialCompras$: Observable<Detallecomprado[]> = new Observable<Detallecomprado[]>(); // Inicializar el observable
  historialCompras: Detallecomprado[] = [];

  constructor(
    private db: DbservicesService,
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.idUser = localStorage.getItem('idusuario');

    // Inicializar el observable con los datos del historial de compras
    this.historialCompras$ = this.db.buscarHistorialCompras(this.idUser);

    // Suscribirse al observable para obtener los datos y almacenarlos en la propiedad historialCompras
    this.historialCompras$.subscribe(historialCompras => {
      this.historialCompras = historialCompras;

      // Aquí puedes imprimir o realizar otras acciones con el historial
      console.log('Historial de compras:', historialCompras);
    });
  }
}
