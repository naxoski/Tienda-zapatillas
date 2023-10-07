import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicesService } from '../services/dbservices.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 usu: string| undefined;
 claveu: string| undefined;

 MostrarCon=false;
 OjoCon='eye';

 credenciales: any=[
  {
    correo: '',
    clave:''
  }
 ]



  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController,private db: DbservicesService) {}
  EstadoContra(): void {
    this.MostrarCon = !this.MostrarCon;

    if (this.OjoCon == 'eye') {
      this.OjoCon = 'eye-off';
    } else {
      this.OjoCon = 'eye';
    }
  }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchUsuario().subscribe(datos=>{
          this.credenciales = datos;
        })
      }
     })
  }

  async iniciar() {
    try {
      const usuario = await this.db.buscarUsu(this.usu, this.claveu);

      if (usuario) {
        // Verifica el tipo de usuario basándote en el campo idrol
        if (usuario.idrol == 'usuario') {
          // Si el idrol es 'usuario', redirige a la página de usuarios
          const alert = await this.alertController.create({
            header: 'Bienvenido usuario!',
            message: 'Sesion iniciada correctamente',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/principal']);
        } else if (usuario.idrol == 'admin') {
          // Si el idrol es 'admin', redirige a la página de administradores
          const alert = await this.alertController.create({
            header: 'Bienvenido admin!',
            message: 'Sesion iniciada correctamente',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/menu-admin']);
        }
      } else {
        // Si las credenciales no son válidas, muestra un mensaje indicando credenciales incorrectas
        const alert = await this.alertController.create({
          header: 'Credenciales incorrectas',
          message: 'No se inicio sesion',
          buttons: ['OK']
        });
        await alert.present();
      }
    } catch (error) {
      // Maneja errores si ocurren durante la consulta
      console.error('Error al verificar credenciales:', error);
    }
  }
}

 

