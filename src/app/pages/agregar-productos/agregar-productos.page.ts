import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.page.html',
  styleUrls: ['./agregar-productos.page.scss'],
})
export class AgregarProductosPage implements OnInit {
  nombreProductos = "";
  descripcionProducto = "";
  precioProducto = "";
  stockProducto = "";
  fotoProducto : any;
  categoriaProducto = "";

  constructor(public router:Router, private db: DbservicesService) { }

  insertar() {
    try {
      this.db.insertarZapatilla(
        this.nombreProductos,
        this.descripcionProducto,
        parseFloat(this.precioProducto),
        parseInt(this.stockProducto, 10),
        this.fotoProducto,
        this.categoriaProducto
      );
      this.db.presentAlert("Zapatilla Agregada");
      this.router.navigate(['/ver-productos']);
    } catch (error) {
      this.db.presentAlert("Zapatilla no agregada");
    }
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
    this.fotoProducto = image.dataUrl;
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };
  ngOnInit() {
  }

}
