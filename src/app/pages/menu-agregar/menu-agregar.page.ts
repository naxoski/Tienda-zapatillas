import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-agregar',
  templateUrl: './menu-agregar.page.html',
  styleUrls: ['./menu-agregar.page.scss'],
})
export class MenuAgregarPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  imagenSeleccionadaUrl: string = '';

  // Variables para almacenar los datos de los productos
  producto1: string = '';
  descripcion1: string = '';
  precio1: number = 0;

  producto2: string = '';
  descripcion2: string = '';
  precio2: number = 0;

  constructor() { }

  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'No se agregó el producto';
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Producto Agregado';
      },
    },
  ];

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Cargar la imagen seleccionada y mostrarla en el elemento img
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenSeleccionadaUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {}
}
