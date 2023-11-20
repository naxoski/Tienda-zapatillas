import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: 'modificar-productos.page.html',
  styleUrls: ['modificar-productos.page.scss'],
})
export class ModificarProductosPage {

    
      idEnviado='';
      nombreEnviado='';
      descripcionEnviada='';
      precioEnviado='';
      stockEnviado='';
      fotoEnviada : any;
      idcategoria ='';
      
  
  constructor(public router:Router, private db: DbservicesService, public toastController: ToastController, private alertController: AlertController,private activedRouter: ActivatedRoute) {

    this.activedRouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idEnviado = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.nombreEnviado = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];

        this.descripcionEnviada = this.router.getCurrentNavigation()?.extras?.state?.['descripcionEnviada'];

        this.precioEnviado = this.router.getCurrentNavigation()?.extras?.state?.['precioEnviado'];
        this.stockEnviado = this.router.getCurrentNavigation()?.extras?.state?.['stock'];
        this.fotoEnviada = this.router.getCurrentNavigation()?.extras?.state?.['fotoEnviada'];
      }
    })
  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90, //Este es la calidad, el 90 significa el 90% de calidad
      //Este es para que edite directamente
      resultType: CameraResultType.DataUrl, //El como quiero guardarla, como quiero configurarla. Lo mejor que haremos con la url es que la guardemos como data, para que cuando la veamos en la pagina salga en la url
      source: CameraSource.Prompt  //Esto es para pdamos elegir el tipo de camera 
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    //var imageUrl = image.webPath;
    this.fotoEnviada = image.dataUrl;
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };
  modificarProducto() {
    try {
    this.db.modificarProducto(this.idEnviado,this.nombreEnviado,this.descripcionEnviada,this.precioEnviado,this.stockEnviado,this.fotoEnviada)
    this.db.presentAlert("Producto modificado");
    this.router.navigate(['/ver-productos']);
      
    } catch (error) {
      this.db.presentAlert("error al insertar producto" + + JSON.stringify(error));
      
    }

  }
  ngOnInit() {
  }



}

