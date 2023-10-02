import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.page.html',
  styleUrls: ['./agregar-usuarios.page.scss'],
})
export class AgregarUsuariosPage implements OnInit {
  rutUsuario="";
  nombreUsuario="";
  apellidoUsuario="";
  fechaNacimiento="";
  teleUsu="";
  correoUsuario="";
  fotoUsu="";
  claveUsuario="";
  preguntaUsuario="";
  respuestaUsuario="";
  rolUsuario="";


  constructor(public router:Router, private db: DbservicesService) { }
  insertarUsu(){
    try {
    this.db.insertarUsuario(this.rutUsuario,this.nombreUsuario,this.apellidoUsuario,this.fechaNacimiento,this.teleUsu,this.fotoUsu,this.correoUsuario,this.claveUsuario,this.respuestaUsuario,this.preguntaUsuario,this.rolUsuario);
    this.db.presentAlert("Usuario Agregado");
    this.router.navigate(['/verusuarios']);
    } catch (error) {
      this.db.presentAlert("Usuario no agregado"); 
    }
  }
  ngOnInit() {
  }

}
