import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  arregloUsuario: any = [
    {
      idusuario: '',
      nombreusuario: '',
      apellidousuario: '',
      fnacimiento: '',
      telefono: '',
      correo: '',
      clave: '',
      respuesta: '',
      idpregunta: '',
      idrol: ''
      
    }

  ]

  constructor(private db: DbservicesService, private router: Router) { }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchUsuario().subscribe(datos=>{
          this.arregloUsuario = datos;
        })
      }
    })
  }

}
