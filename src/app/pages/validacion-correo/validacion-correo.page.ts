import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-validacion-correo',
  templateUrl: './validacion-correo.page.html',
  styleUrls: ['./validacion-correo.page.scss'],
})
export class ValidacionCorreoPage implements OnInit {
  correo: string| undefined;
 
  MostrarCon=false;
  OjoCon='eye';
 
  credenciales: any=[
   {
     correo: '',
   }
  ]

  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController,private db: DbservicesService) { }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchUsuario().subscribe(datos=>{
          this.credenciales = datos;
        })
      }
     })
  }
  async buscarCorreo() {
    try {
      const usuario = await this.db.buscarCorreo(this.correo);

      if (usuario) {
          const alert = await this.alertController.create({
            header: 'Correo Verificado!',
            message: 'Correo encontrado',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/recuperar-contra']);
        
      } else {
        // Si las credenciales no son válidas, muestra un mensaje indicando credenciales incorrectas
        const alert = await this.alertController.create({
          header: 'Credenciales incorrectas',
          message: 'No se encontro el correo ingresado',
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
