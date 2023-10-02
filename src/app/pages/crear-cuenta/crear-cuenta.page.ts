import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {
  nombre: string| undefined;
  apellido: string| undefined;
  clave: string| undefined;
  clave2:string| undefined;
  direccion: string| undefined;
  pregunta: string| undefined;
  respuesta: string| undefined;


  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController) { }
  async crear() {
    // Validación de campos vacíos
    if (!this.nombre || !this.apellido || !this.direccion || !this.pregunta || !this.respuesta) {
      const alert = await this.alertController.create({
        header: 'Campos Incompletos',
        message: 'Complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validación de números en nombre y apellido
    if (/[0-9]/.test(this.nombre)) {
      const alert = await this.alertController.create({
        header: 'Campos Incorrectos',
        message: 'No se permiten números en el nombre',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (/[0-9]/.test(this.apellido)) {
      const alert = await this.alertController.create({
        header: 'Campos Incorrectos',
        message: 'No se permiten números en el apellido',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }





    /* VALIDACIONES DE LA CONTRASEÑA */





    /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UN NÚMERO*/
    if (!this.clave || !/[0-9]/.test(this.clave)) {
    const alert = await this.alertController.create({
    header: 'Campos Incorrectos',
    message: 'La contraseña debe contener al menos un número.',
    buttons: ['OK']
      });
      await alert.present();
      return;
    }





     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS 8 CARACTERES*/
    if (!this.clave || this.clave.length <= 8) {
      const alert = await this.alertController.create({
        header: 'Contraseña Inválida',
        message: 'La contraseña debe tener más de 8 caracteres.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }




     /*VALIDA QUE LA CONTRASEÑA SEA IGUAL A LA QUE SE REPITE*/
    if (!this.clave || !this.clave2 || this.clave !== this.clave2) {
      const alert = await this.alertController.create({
        header: 'Contraseñas No Coinciden',
        message: 'Las contraseñas deben coincidir.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }



     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UNA LETRA MINUSCULA*/
    if (!this.clave || !/[a-z]/.test(this.clave)) {
      const alert = await this.alertController.create({
        header: 'Contraseña Inválida',
        message: 'La contraseña debe contener al menos una letra minúscula.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }



     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UNA LETRA MAYUSCULA*/
    if (!this.clave || !/[A-Z]/.test(this.clave)) {
      const alert = await this.alertController.create({
        header: 'Contraseña Inválida',
        message: 'La contraseña debe contener al menos una letra mayúscula.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }




     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UN CARACTER ESPECIAL*/
    if (!this.clave || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/.test(this.clave)) {
      const alert = await this.alertController.create({
        header: 'Contraseña Inválida',
        message: 'La contraseña debe contener al menos un carácter especial.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }


  // Si todas las validaciones pasan:
  const successAlert = await this.alertController.create({
    header: 'Registro Exitoso',
    message: 'Su registro ha sido completado con éxito.',
    buttons: ['OK']
  });
    await successAlert.present();
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

}

 /* VALIDACIONES DE LA CONTRASEÑA */







    

 

