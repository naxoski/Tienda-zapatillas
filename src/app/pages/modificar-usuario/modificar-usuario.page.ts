import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: 'modificar-usuario.page.html',
  styleUrls: ['modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage {
  idusuario = '';
  rutusu = '';
  nuevoNombre = '';
  nuevoapellido = '';
  nuevoEmail = '';
  imageSource: any;
  nuevotelefono= '';
  clave= '';
  respuesta= '';
  pregunta= '';
  idrol= '';
  fechadenacimiento= '';

  constructor(public router:Router, private db: DbservicesService, public toastController: ToastController, private alertController: AlertController,private activedRouter: ActivatedRoute) {

    this.activedRouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idusuario = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];

        this.rutusu = this.router.getCurrentNavigation()?.extras?.state?.['rutusu'];

        this.nuevoNombre = this.router.getCurrentNavigation()?.extras?.state?.['nuevoNombre'];
        this.nuevoapellido = this.router.getCurrentNavigation()?.extras?.state?.['nuevoapellido'];
        this.nuevotelefono = this.router.getCurrentNavigation()?.extras?.state?.['nuevotelefono'];
        this.imageSource = this.router.getCurrentNavigation()?.extras?.state?.['imageSource'];
        this.nuevoEmail = this.router.getCurrentNavigation()?.extras?.state?.['nuevoEmail'];
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
    this.imageSource = image.dataUrl;
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };
  modificarUsuario() {
    try {
    this.db.modificarUsuario(this.idusuario,this.rutusu,this.nuevoNombre,this.nuevoapellido,this.nuevotelefono,this.imageSource,this.nuevoEmail)
    this.db.presentAlert("Usuario modificado");
    this.router.navigate(['/verusuarios']);
      
    } catch (error) {
      this.db.presentAlert("error al insertar usuario" + + JSON.stringify(error));
      
    }

  }
  ngOnInit() {
  }

}
