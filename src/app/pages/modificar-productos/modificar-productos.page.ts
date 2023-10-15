import { Component } from '@angular/core';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: 'modificar-productos.page.html',
  styleUrls: ['modificar-productos.page.scss'],
})
export class ModificarProductosPage {
  nombreProducto: string = '';
  nuevoPrecio: number = 0;
  nuevoStock: number = 0;

  productos: any[] = [
    { nombre: 'Zapatillas 1', precio: 50, stock: 10 },
    { nombre: 'Zapatillas 2', precio: 60, stock: 5 },
    { nombre: 'Zapatillas 3', precio: 70, stock: 8 },
  ];

  modificarProducto() {
    // Validar que los campos no estén vacíos y que el precio y el stock sean números válidos.
    if (this.nombreProducto.trim() === '' || isNaN(this.nuevoPrecio) || isNaN(this.nuevoStock)) {
      console.log("Por favor, complete todos los campos con valores válidos.");
      return;
    }

    for (let producto of this.productos) {
      if (producto.nombre === this.nombreProducto) {
        producto.precio = this.nuevoPrecio;
        producto.stock = this.nuevoStock;
        console.log(`Producto '${this.nombreProducto}' modificado con éxito.`);
        break;
      }
    }
  }
}

