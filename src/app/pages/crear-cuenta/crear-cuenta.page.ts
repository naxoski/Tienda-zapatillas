import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {
  rut= "";
  nombre="";
  apellido="";
  fnacimiento= "";
  telefono= "";
  fotoperfil= "";
  correo= "";
  clave= "";
  clave2= "";
  respuesta= "";
  pregunta= "";

  


  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController, private db: DbservicesService) { }
  async crear() {


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
  try{
    this.db.insertarUsuario(this.rut,this.nombre,this.apellido,this.fnacimiento,this.telefono,this.fotoperfil,this.correo,this.clave,this.respuesta,this.pregunta,"usuario");
    const successAlert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Su registro ha sido completado con éxito.',
      buttons: ['OK']
    });
    await successAlert.present();
    this.router.navigate(['/home']);
  }catch(error){
    this.db.presentAlert("Usuario no agregado"); 
  }
  }
  ngOnInit() {
  }

}

 /* VALIDACIONES DE LA CONTRASEÑA */







    

 

