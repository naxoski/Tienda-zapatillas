import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { Detalle } from 'src/app/services/detalle';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
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
  diasSumar = 20;
  fdespacho = new Date(this.fechaActual);
  detalle: any = [{iddetalle: '', cantidad: '',detalle:'',idproducto:'',idventa:''}];
  detalles:any =[{iddetalle:'',cantidad:'',detalle:'',idproducto:'',idventa:'',nombreproducto:'', precio:'',stock:'',foto:''}];


  constructor(private db: DbservicesService, private router: Router, public toastController: ToastController,private activeRouter: ActivatedRoute) {
    this.activeRouter.queryParams.subscribe(param => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idproducto = this.router.getCurrentNavigation()?.extras?.state?.["prodEnviar"];
      }
      }) 
  }

  async redireccion(){
    // Actualizar la vista del carrito después de agregar un producto
    this.db.buscarDetallesVenta(this.venta.idventa).subscribe(detalles => {
      this.detalles = detalles; // Actualiza la lista de detalles
      this.router.navigate(['carrito']);
    });
  }
  async comprar2() {

    this.redireccion();
    
  }
  async comprar(precio:any ,idprod: any) {
    this.db.buscarVentaCarrito(this.idUser, 'Activo').subscribe(async ventas => {
      if (ventas.length === 1) {
        this.venta = ventas[0];
  
        this.db.buscarDetalleProd(idprod, this.venta.idventa).subscribe(detalles => {
          if (detalles.length === 1) {
            this.detalle = detalles[0];
            console.log("ID DEL DETALLE ENCONTRADO: " + this.detalle.iddetalle);
            this.db.modificarDetalle(this.detalle.iddetalle, this.detalle.detalle + precio, this.detalle.cantidad + 1);
            this.db.modificarTotal(this.venta.idventa, this.venta.total + precio);
            console.log("-------------------------------------");
            console.log("  Se está modificando el detalle ya previamente existente");
            console.log("-------------------------------------");
            console.log("Se usó el del detalle que ya existe aaaaaaaaaaaaaaa");
          } else {
            this.detalle = this.db.agregarDetalle(1, precio, this.venta.idventa, idprod);
            this.db.modificarTotal(this.venta.idventa, this.venta.total + precio);
            console.log("ID DEL DETALLE CREADO: " + this.detalle.iddetalle);
            console.log("-------------------------------------");
            console.log("Se está agregando un nuevo detalle");
            console.log("-------------------------------------");
          }
        });

      } else {
        this.fdespacho.setDate(this.fechaActual.getDate() + this.diasSumar);

        await this.db.insertarVenta(this.fechaActual,this.fdespacho, 'Activo', precio, 'C', this.idUser);

        this.db.fetchVenta().subscribe(venta2 => {
          this.venta = venta2[venta2.length - 1];
          console.log("ID de la venta que se generó: "+this.venta.idventa);
          this.db.agregarDetalle(1, precio, this.venta.idventa, idprod);

        })
        
        
        
      }
    });
  }

  ngOnInit() {
  
    this.db.fetchProducto().subscribe(datos => {
      this.arregloZapatillas = datos;
    });

    this.idUser = localStorage.getItem('idusuario')
  }

}


 

