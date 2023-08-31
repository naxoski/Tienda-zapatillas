import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 admin ="admin";
 clave="admin";
 cliente="ignacio";
 Clave="1234";
 usu: string| undefined;
 claveu: string| undefined;

 MostrarCon=false;
 OjoCon='eye';



  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController) {}
  EstadoContra(): void {
    this.MostrarCon = !this.MostrarCon;

    if (this.OjoCon == 'eye') {
      this.OjoCon = 'eye-off';
    } else {
      this.OjoCon = 'eye';
    }
  }

  ngOnInit() {
  }

  async iniciar() {
    if (!this.usu ||!this.claveu) {
      const alert = await this.alertController.create({
        header: 'Campos Incompletos',
        message: 'Complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.usu == this.cliente && this.claveu == this.Clave) {
      this.router.navigate(['/principal']);
    } else if (this.usu == this.admin && this.claveu == this.clave) {
      this.router.navigate(['/principal']);
    } else {
      const alert = await this.alertController.create({
        header: 'Credenciales Incorrectas',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
 

 
}
