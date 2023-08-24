import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user1: string = "";
  nombreUsuario: string ="Nacho";
  clave = "1234";
  edad : number = 12;
  lista : any = [
    {
      nombre : "diego",
      apellido :"Espejo",
      edad : 20
    }
  ]


  constructor(private router:Router, private alertController: AlertController,private toastController: ToastController) {}

  sumar(){
  this.clave;
  console.log("Mostrar mensajes por consola");
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  inicioSesion(){
    let navigationExtras : NavigationExtras ={
      state : {
        userEnviado: this.user1,
        claveEnviada: this.clave
      }
    }
    this.presentToast();
    this.router.navigate(['/pagina1'],navigationExtras);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: "bottom",
    });

    await toast.present();
  }
}
