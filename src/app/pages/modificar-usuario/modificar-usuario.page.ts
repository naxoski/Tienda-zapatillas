import { Component } from '@angular/core';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: 'modificar-usuario.page.html',
  styleUrls: ['modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage {
  nombreUsuario: string = '';
  nuevoNombre: string = '';
  nuevoEmail: string = '';

  usuarios: any[] = [
    { nombreUsuario: 'usuario1', nombre: 'Nombre1', email: 'email1@example.com' },
    { nombreUsuario: 'usuario2', nombre: 'Nombre2', email: 'email2@example.com' },
    { nombreUsuario: 'usuario3', nombre: 'Nombre3', email: 'email3@example.com' },
  ];

  modificarUsuario() {
    for (let usuario of this.usuarios) {
      if (usuario.nombreUsuario === this.nombreUsuario) {
        usuario.nombre = this.nuevoNombre;
        usuario.email = this.nuevoEmail;
        
        console.log(`Usuario '${this.nombreUsuario}' modificado con éxito.`);
        break;
      }
    }
  }
}
