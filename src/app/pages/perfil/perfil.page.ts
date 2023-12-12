import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  constructor(
    public router: Router,
    public navCtrl: NavController, 
    private db: DbservicesService,
    public toastController: ToastController,
    private alertController: AlertController,
    private activedRouter: ActivatedRoute
  ) { }
  idUser: any ;
  usuario : any = [
    {
      idusuario: '',
      nombreusuario: '',
      apellidousuario: '',
      fnacimiento: '',
      telefono: '',
      fotoperfil: '',
      correo: '',
      clave: '',
      respuesta: '',
      idpregunta: '',
      idrol: ''
      
    }

  ]


  ngOnInit() {
    this.idUser = localStorage.getItem('idusuario');

    if (this.idUser) {
      this.db.buscarUsuariosPorid(this.idUser).then(() => {
        this.db.dbState().subscribe(res => {
          if (res) {
            this.db.fetchUsuario().subscribe(datos => {
              this.usuario  = datos[0];
            });
          }
        });
      });
    } else {
      // Manejar el caso en que no haya un 'idusuario' en el localStorage
      console.error('No se encontró un idusuario en el localStorage');
    }

   
  }
  modificarUsuario() {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.usuario.idusuario,
        nuevoNombre: this.usuario.nombreusuario,
        nuevoapellido: this.usuario.apellidousuario,
        fechanacimiento: this.usuario.fnacimiento,
        nuevotelefono: this.usuario.telefono,
        imageSource: this.usuario.fotoperfil,
        nuevoEmail: this.usuario.correo,
      },
    };
    console.log('Datos a enviar:', navigationExtras.state);
    this.router.navigate(['/modificar-perfil'], navigationExtras);
  }



 

}
