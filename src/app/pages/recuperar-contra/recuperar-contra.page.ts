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
      // Verificar si las variables son válidas
      if (!this.correo || !this.pregunta || !this.respuesta) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Todos los campos son obligatorios',
          buttons: ['OK']
        });
        await alert.present();
        return; // Salir si alguna variable es inválida
      }
  
      // Llamar a la función de búsqueda
      const usuario = await this.db.buscarCorreoYPregunta(this.correo, this.pregunta, this.respuesta);
  
      if (usuario) {
        const alert = await this.alertController.create({
          header: 'Credenciales Verificadas!',
          message: 'Credenciales encontradas',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/cambiarcontra']);
      } else {
        const alert = await this.alertController.create({
          header: 'Credenciales incorrectas',
          message: 'No se encontraron las credenciales ingresadas',
          buttons: ['OK']
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al verificar credenciales:', error);
    }
}
}
