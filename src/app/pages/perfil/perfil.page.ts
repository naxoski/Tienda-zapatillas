import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
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

  constructor(private db: DbservicesService, private router: Router) { }

 

}
