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
      this.db.buscarUsu(this.usu, this.claveu).subscribe(
        usuario => {
          if (usuario) {
            if (usuario.idrol === 'usuario') {
              this.alertController.create({
                header: 'Bienvenido usuario!',
                message: 'Sesión iniciada correctamente',
                buttons: ['OK']
              }).then(alert => alert.present());
              this.router.navigate(['/principal']);
            } else if (usuario.idrol === 'admin') {
              this.alertController.create({
                header: 'Bienvenido admin!',
                message: 'Sesión iniciada correctamente',
                buttons: ['OK']
              }).then(alert => alert.present());
              this.router.navigate(['/menu-admin']);
            }
          } else {
            this.alertController.create({
              header: 'Credenciales incorrectas',
              message: 'No se inició sesión',
              buttons: ['OK']
            }).then(alert => alert.present());
          }
        },
        error => {
          console.error('Error al verificar credenciales:', error);
        }
      );
    } catch (error) {
      console.error('Error al verificar credenciales:', error);
    }
  }
  
}

 

