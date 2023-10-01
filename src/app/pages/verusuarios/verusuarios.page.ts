import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras} from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.page.html',
  styleUrls: ['./verusuarios.page.scss'],
})
export class VerusuariosPage implements OnInit {
  
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

  constructor(private db: DbservicesService, private router: Router) { 

  }

  ngOnInit() {
      //subscribo al observable de la BD
      this.db.dbState().subscribe(res=>{
        if(res){
          this.db.fetchUsuario().subscribe(datos=>{
            this.arregloUsuario = datos;
          })
        }
       })
  }


}
