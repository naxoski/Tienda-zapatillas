import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-usocamara',
  templateUrl: './usocamara.page.html',
  styleUrls: ['./usocamara.page.scss'],
})
export class UsocamaraPage implements OnInit {

  imageSource: any;

  constructor() { }

  ngOnInit() {
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90, //Este es la calidad, el 90 significa el 90% de calidad
      allowEditing: true,
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

}
