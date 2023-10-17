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
  hayprod: boolean = true;
  idprod: number = 0;
  arregloZapatillas: any = [];
  permisoStorage: any = 0;
  permiso: any = 0;
  correoUser: any = "";
  usuario: any = {idusuario: '', rut: '', nombreusuario: '', apellidousuario: '',fnacimiento: '', telefono: '', fotoperfil: '' ,correo: '',clave: '', respuesta: '',idpregunta:'',idrol:''};
  venta:any=[{idventa:'',fventa:'',estatus:'',total:'',carrito:'',idusuario:''}];
  fechaActual = new Date();
  diasSumar = 20;
  fechaEntrega = new Date(this.fechaActual);
  detalle: any = [{iddetalle: '', cantidad: '',detalle:'',idproducto:'',idventa:''}];
  detalles:any =[{iddetalle:'',cantidad:'',detalle:'',idproducto:'',idventa:'',nombreproducto:'', precio:'',stock:'',foto:''}];


  constructor(private db: DbservicesService, private router: Router, public toastController: ToastController,private activeRouter: ActivatedRoute) {
    this.activeRouter.queryParams.subscribe(param => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idprod = this.router.getCurrentNavigation()?.extras?.state?.["prodEnviar"];
      }
      }) 
  }

  async redireccion(){
    // Actualizar la vista del carrito después de agregar un producto
  
  }
  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.db.fetchProducto().subscribe(datos => {
      this.arregloZapatillas = datos;
    });
  }

}


 

