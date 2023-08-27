import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController,IonicSlides } from '@ionic/angular';


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
      nombre : "ignacio",
      apellido :"huerta",
      edad : 19,
      email: "ignaciohuerta8a@gmail.com"
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
    this.router.navigate(['/principal'],navigationExtras);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inicio de sesion correcto!',
      duration: 1500,
      position: "bottom",
    });

    await toast.present();
  }
}
