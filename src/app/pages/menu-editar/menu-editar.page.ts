import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-editar',
  templateUrl: './menu-editar.page.html',
  styleUrls: ['./menu-editar.page.scss'],
})
export class MenuEditarPage {
  imagenProducto1: string = 'assets/retro_2.webp';
  imagenProducto2: string = 'assets/retro_3.webp';
  imagenProducto3: string = 'assets/retro_4.webp';
  imagenProducto4: string = 'assets/retro_5.webp';
  handlerMessage = '';
  roleMessage = '';
  constructor() { }
  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'No sé hizo el cambio';
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Se hizo el cambio correctamente';
      },
    },
  ];
  cambiarImagen(producto: number) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (producto === 1) {
            this.imagenProducto1 = e.target.result;
          } else if (producto === 2) {
            this.imagenProducto2 = e.target.result;
          } else if (producto === 3) {
            this.imagenProducto3 = e.target.result;
          } else if (producto === 4) {
            this.imagenProducto4 = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  }
}
