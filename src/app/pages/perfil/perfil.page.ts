import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  idUser: any =0;
  arregloUsuario: any = [
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
    this.idUser = localStorage.getItem('idusuario')

    this.db.buscarUsuariosPorid(this.idUser)

    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchUsuario().subscribe(datos=>{
          this.arregloUsuario = datos[0];
        })
      }
    })
   
  }

  constructor(private db: DbservicesService, private router: Router) { }

 

}
