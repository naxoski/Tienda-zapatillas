import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.page.html',
  styleUrls: ['./cambiarcontra.page.scss'],
})
export class CambiarcontraPage implements OnInit {
  clave1= "";
  clave2= "";

  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController,private db: DbservicesService) { }

  ngOnInit() {
  }
  async cambiarClave() {
    // Verificar que las contraseñas coincidan
    if (this.clave1 !== this.clave2) {
      this.mostrarMensaje('Las contraseñas no coinciden.');
      return;
    }

    // Obtener datos del localStorage
    const pregunta = localStorage.getItem('idpregunta');
    const respuesta = localStorage.getItem('respuesta');
    const correo = localStorage.getItem('correo');

    // Llamar a CambiarContra del servicio de base de datos.
    await this.db.CambiarContra(
      this.clave1,pregunta,respuesta,correo
    );

    // Mostrar un mensaje de éxito
    this.mostrarMensaje('Contraseña cambiada exitosamente.');
    this.router.navigate(['/home']);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
