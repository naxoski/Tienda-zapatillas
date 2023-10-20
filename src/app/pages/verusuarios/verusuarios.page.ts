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
  
  usuario: any = {idusuario: '', rut: '', nombreusuario: '', apellidousuario: '',fnacimiento: '', telefono: '', fotoperfil: '' ,correo: '',clave: '', respuesta: '',idpregunta:'',idrol:''};

  constructor(private db: DbservicesService, private router: Router) { 

  }

  ngOnInit() {
      //subscribo al observable de la BD
      this.db.dbState().subscribe(res=>{
        if(res){
          this.db.fetchUsuario().subscribe(datos=>{
            this.usuario = datos;
          })
        }
       })
  }
  eliminar(x:any){
    this.db.eliminarUsuario(x.idusuario);
    this.db.presentAlert("Usuario Eliminado");
  }
  modificarUsuario(x: any){
    let navigationExtras: NavigationExtras = {
      state:{
      idEnviado: x.idusuario,
      rutusu:x.rut,
      nuevoNombre: x.nombreusuario,
      nuevoapellido:x.apellidousuario,
      nuevotelefono:x.telefono,
      imageSource:x.fotoperfil ,
      nuevoEmail:x.correo,
      

      }
    }
    this.router.navigate(['/modificar-usuario'],navigationExtras);
  }


}
