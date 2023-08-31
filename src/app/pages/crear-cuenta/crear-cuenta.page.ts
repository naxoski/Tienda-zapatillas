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
  direccion: string| undefined;
  pregunta: string| undefined;
  respuesta: string| undefined;
  camposvali=false;
  nombrevali =false;
  apellidovali=false;
  clavevali=false;


  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController) { }
  async crear(){
    if (!this.nombre||!this.apellido||!this.direccion||this.pregunta||!this.respuesta ){
      const alert = await this.alertController.create({
        header: 'Campos Incompletos',
        message: 'Complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }else{
      this.camposvali=true;
    }



    /* VALIDACIONES DEL NOMBRE Y APELLIDO*/
    if(!this.nombre|| /[0-9] /.test(this.nombre)){
      const alert = await this.alertController.create({
        header: 'Campos Incorrectos',
        message: 'No se permiten números en el nombre',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }else{
      this.nombrevali=true;
    }
    if(!this.apellido|| /[0-9] /.test(this.apellido)){
      const alert = await this.alertController.create({
        header: 'Campos Incorrectos',
        message: 'No se permiten números en el apellido',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }else{
      this.apellidovali=true;
    }


 /* VALIDACIONES DE LA CONTRASEÑA */


 /*Que tenga numeros*/
if (!this.clave || !/[0-9]/.test(this.clave)) {
  const alert = await this.alertController.create({
    header: 'Campos Incorrectos',
    message: 'La contraseña debe tener al menos un número.',
    buttons: ['OK']
  });
  await alert.present();
  return;
  }else{
    this.clavevali=true;
  }


  /*Que tenga minimo 8 de largo*/

}






    

  ngOnInit() {
  }

}
