import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  idusuario : any;
  nombreUsu = '';
  apellidoUsu = '';
  fechaUsu = '';
  imagenUsu: any;
  telefonoUsu= '';

  constructor(public router:Router, private db: DbservicesService, public toastController: ToastController, private alertController: AlertController,private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idusuario = this.router.getCurrentNavigation()?.extras?.state?.['idusuario'];
        this.nombreUsu = this.router.getCurrentNavigation()?.extras?.state?.['nombreUsu'];

        this.apellidoUsu = this.router.getCurrentNavigation()?.extras?.state?.['apellidoUsu'];

        this.fechaUsu = this.router.getCurrentNavigation()?.extras?.state?.['fechaUsu'];
        this.imagenUsu = this.router.getCurrentNavigation()?.extras?.state?.['imagenUsu'];
        this.telefonoUsu = this.router.getCurrentNavigation()?.extras?.state?.['telefonoUsu'];
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
    this.imagenUsu = image.dataUrl;
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };

  ngOnInit() {
    this.idusuario = localStorage.getItem('idusuario')

  }

}
