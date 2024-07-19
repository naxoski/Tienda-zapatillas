import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { FlowIntegrationService } from 'src/app/services/flow-integration.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  idUser: any = 0;
  hayprod: boolean = true;
  idproducto: number = 0;
  arregloZapatillas: any = [{ idproducto: '', nombreproducto: '', descripcion: '', precio: '', stock: '', foto: '', idcategoria: '' }];
  permisoStorage: any = 0;
  permiso: any = 0;
  correoUser: any = "";
  usuario: any = { idusuario: '', rut: '', nombreusuario: '', apellidousuario: '', fnacimiento: '', telefono: '', fotoperfil: '', correo: '', clave: '', respuesta: '', idpregunta: '', idrol: '' };
  venta: any = [{ idventa: '', fventa: '', fdespacho: '', estatus: '', total: '', carrito: '', idusuario: '' }];
  fechaActual = new Date();
  diasSumar = 7;
  fdespacho = new Date(this.fechaActual);
  detalle: any = [{ iddetalle: '', cantidad: '', detalle: '', idproducto: '', idventa: '' }];
  detalles: any = [{ iddetalle: '', cantidad: '', detalle: '', idproducto: '', idventa: '', nombreproducto: '', precio: '', stock: '', foto: '' }];
  stock: number = 0;
  carrito: any = {};

  constructor(
    private db: DbservicesService,
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private alertController: AlertController,
    private flowService: FlowIntegrationService
  ) { }

  ngOnInit() {
    this.idUser = localStorage.getItem('idusuario');

    this.db.buscarVentaCarrito(this.idUser, "Activo").subscribe(datos => {
      if (datos && datos.length > 0) {
        this.venta = datos[0];
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
    }
  }

  async Pagar() {
    try {
      // Ajustar la fecha de despacho y convertirla a string
      this.fdespacho.setDate(this.fechaActual.getDate() + this.diasSumar);
      const fechaEntrega = this.fdespacho.toISOString(); // Convierte a ISO string
      await this.db.modificarFechaEntrega(this.venta.idventa, fechaEntrega);
      await this.db.modificarEstadoVenta(this.venta.idventa, 'Comprado');
  
      let totalVenta = 0;
      for (let detalle of this.detalles) {
        totalVenta += detalle.precio * detalle.cantidad;
      }
  
      const datosPago = {
        amount: totalVenta,
        subject: 'Compra en MiTienda',
        email: this.correoUser, // Reemplaza con el correo del usuario
        currency: 'CLP' // Asegúrate de usar la moneda correcta
      };
  
      const respuestaFlow = await this.flowService.iniciarPago(datosPago).toPromise();
      console.log('Respuesta de Flow:', respuestaFlow);
  
      if (respuestaFlow && respuestaFlow.payment_url) {
        window.location.href = respuestaFlow.payment_url;
      } else {
        throw new Error('No se recibió la URL de pago de Flow');
      }
  
      await this.mostrarMensaje('Redirigiendo al portal de pago...');
  
      for (let x of this.detalles) {
        this.stock = x.stock - x.cantidad;
        await this.db.restarStock(x.idproducto, this.stock);
        await this.db.buscarCompras(x.idproducto);
        await this.db.insertarDetalleCompra(x.idproducto, x.nombreproducto, x.foto, x.cantidad, totalVenta, this.venta.idventa);
      }
  
      const detallesComprados = await lastValueFrom(this.db.buscarDetallesCompraVenta(this.venta.idventa));
      console.log('Detalles comprados:', detallesComprados);
  
      await this.mostrarMensaje('Compra realizada con éxito.');
  
    } catch (error) {
      console.error('Error al realizar el pago:', error);
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
