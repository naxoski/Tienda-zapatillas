import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

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
  idUser: any =0;
  hayprod: boolean = true;
  idproducto: number = 0;
  arregloZapatillas: any = [{idproducto:'',nombreproducto:'',descripcion:'',precio:'',stock:'',foto:'',idcategoria:''}];
  permisoStorage: any = 0;
  permiso: any = 0;
  correoUser: any = "";
  usuario: any = {idusuario: '', rut: '', nombreusuario: '', apellidousuario: '',fnacimiento: '', telefono: '', fotoperfil: '' ,correo: '',clave: '', respuesta: '',idpregunta:'',idrol:''};
  venta: any =[{idventa:'',fventa:'',fdespacho:'',estatus:'',total:'',carrito:'',idusuario:''}];
  fechaActual = new Date();
  diasSumar = 7;
  fdespacho = new Date(this.fechaActual);
  detalle: any = [{iddetalle: '', cantidad: '',detalle:'',idproducto:'',idventa:''}];
  detalles:any =[{iddetalle:'',cantidad:'',detalle:'',idproducto:'',idventa:'',nombreproducto:'', precio:'',stock:'',foto:''}];
  stock: number = 0;
  carrito: any = {};
  
  
 



  constructor(private db: DbservicesService, private router: Router, private navCtrl: NavController, private route: ActivatedRoute, public toastController: ToastController, private alertController: AlertController) {}

  ngOnInit() {
    this.idUser = localStorage.getItem('idusuario');
  
    this.db.buscarVentaCarrito(this.idUser, "Activo").subscribe(datos => {
      if (datos && datos.length > 0) {
        this.venta = datos[0];
  
        // Manejo adicional si es necesario antes de cargar los detalles
        this.cargarDetallesVenta();
      }
    });
  }
  async cargarDetallesVenta() {
    try {
      const detalles = await lastValueFrom(this.db.buscarDetallesVenta(this.venta.idventa));
      this.detalles = detalles;
    } catch (error) {
      console.error('Error al cargar detalles de venta:', error);
      // Agrega manejo de errores según sea necesario
    }
  }
  async Pagar() {
    try {
      this.fdespacho.setDate(this.fechaActual.getDate() + this.diasSumar);
  
      await this.db.modificarFechaEntrega(this.venta.idventa, this.fdespacho);
      await this.db.modificarEstadoVenta(this.venta.idventa, 'Comprado');
  
      for (let x of this.detalles) {
        this.stock = x.stock - x.cantidad;
        console.log("Stock del producto: " + x.stock);
        console.log("Cantidad del detalle:" + x.cantidad);
        console.log("ID del producto: " + x.idproducto);
  
        await this.db.restarStock(x.idproducto, this.stock);
        await this.db.buscarCompras(x.idproducto);
  
        this.db.fetchProducto().subscribe(item => {
          this.arregloZapatillas = item[0];
        });
      }
  
      // Recupera detalles comprados (historial de compras) después de pagar
      const detallesComprados = await lastValueFrom(this.db.buscarDetallesCompraVenta(this.venta.idventa));
      console.log('Detalles comprados:', detallesComprados);
  
      // Muestra un mensaje de éxito
      await this.mostrarMensaje('Compra realizada con éxito.');
  
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      // Muestra un mensaje de error
      await this.mostrarMensaje('Error al realizar la compra. Inténtalo nuevamente.');
    }
  }
  
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
  
}


