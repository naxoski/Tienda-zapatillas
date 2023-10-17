import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService} from 'src/app/services/dbservices.service';
import { Zapatillas } from 'src/app/services/zapatillas';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  arregloZapatillas: any = [];


  constructor(private db: DbservicesService, private router: Router,private navCtrl: NavController,public toastController: ToastController, private alertController: AlertController) { }

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
 // Función para agregar un producto al carrito
 agregarAlCarrito(idproducto: number) {
  // Obtiene el ID del usuario del localStorage
  const idusuario = localStorage.getItem('idusuario');
  
  if (idusuario) {
    // Llama al método del servicio para agregar un producto al carrito
    this.db.agregarAlCarrito(+idusuario, idproducto, 1).then(() => {
      // También llama a la función para agregar el producto al detalle de la venta
      this.db.agregarProductoAlDetalle(+idusuario, idproducto, 1).then(() => {
        this.presentToast('Producto agregado al carrito y al detalle de venta');
      }).catch(error => {
        console.error('Error al agregar producto al detalle de venta: ', error);
        this.presentToast('Error al agregar producto al detalle de venta'+ JSON.stringify(error));
      });
    }).catch(error => {
      console.error('Error al agregar producto al carrito: ', error);
      this.presentToast('Error al agregar producto al carrito'+ JSON.stringify(error));
    });
  } else {
    // Maneja el caso en el que el ID del usuario no está en el localStorage
    this.presentToast('Error: ID de usuario no encontrado en el localStorage');
  }
}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
   });
    toast.present();
  }
}
