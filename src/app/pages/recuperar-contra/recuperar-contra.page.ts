import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {
  correo: string| undefined;
  pregunta: any;
  respuesta: any;
 
  MostrarCon=false;
  OjoCon='eye';
 
  credenciales: any=[
   {
     correo: '',
     pregunta: '',
     respuesta: '',
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
  async buscarCorreoYPregunta() {
    try {
      const usuario = await this.db.buscarCorreoYPregunta(this.correo, this.pregunta, this.respuesta);

      if (usuario) {
          const alert = await this.alertController.create({
            header: 'Credenciales Verificadas!',
            message: 'Credenciales encontradas',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/home']);
        
      } else {
        // Si las credenciales no son válidas, muestra un mensaje indicando credenciales incorrectas
        const alert = await this.alertController.create({
          header: 'Credenciales incorrectas',
          message: 'No se encontraron las credenciales ingresadas',
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
