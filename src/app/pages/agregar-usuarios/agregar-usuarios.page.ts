import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController} from '@ionic/angular';
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

  mensajeErrorNombreU: string = '';
  mensajeErrorApellidoU: string = '';
  errores: string[] = [];

  Validador1 = false;
  Validador2 = false;
  Validador3 = false;
  Validador4 = false;
  Validador5 = false;
  Validador6 = false;
  Validador7 = false;
  Validador8 = false;

  constructor(public router:Router, private db: DbservicesService, public toastController: ToastController, private alertController: AlertController) { }
  
  valiRut(event: KeyboardEvent) {
    const input = event.key;
  
    // Verifica si el input es un número o una 'k' (puede ser minúscula o mayúscula)
    const regex = /^[0-9kK]$/i;
  
    if (!regex.test(input) && input !== 'Backspace') {
      event.preventDefault(); // No permite caracteres no válidos excepto Backspace
    } else if (input !== 'Backspace') {
      if (input.match(/[0-9kK]/i)) {
        if (this.rutUsuario.length === 2 || this.rutUsuario.length === 6) {
          this.rutUsuario = this.rutUsuario + '.';
        } else if (this.rutUsuario.length === 10) {
          this.rutUsuario = this.rutUsuario + '-';
        }
  
        if (this.rutUsuario.length > 11) {
          event.preventDefault(); // No permite más caracteres después de la posición 11
        }
        if (this.rutUsuario.length === 12 && input === '0') {
          this.rutUsuario = this.rutUsuario.slice(0, -1) + 'k';
          event.preventDefault(); 
        }
      }
    }
  }
  
  insertarUsu(){
    try {
    this.db.insertarUsuario(this.rutUsuario,this.nombreUsuario,this.apellidoUsuario,this.fechaNacimiento,this.teleUsu,this.fotoUsu,this.correoUsuario,this.claveUsuario,this.respuestaUsuario,this.preguntaUsuario,this.rolUsuario);
    this.db.presentAlert("Usuario Agregado");
    this.router.navigate(['/verusuarios']);
    } catch (error) {
      this.db.presentAlert("Usuario no agregado"); 
    }
  }

  async crear() {
    this.mensajeErrorNombreU = "";
    this.mensajeErrorApellidoU = "";


    // Validación de números en nombre
    if (/[0-9]/.test(this.nombreUsuario)) {
      this.mensajeErrorNombreU = 'No se permiten números en el nombre';
      this.Validador1 = false;
    }
    else{
      this.Validador1 = true;
    }

    // Validación de números en apellido
    if (/[0-9]/.test(this.apellidoUsuario)) {
      this.mensajeErrorApellidoU = 'No se permiten números en el apellido';
      this.Validador2 = false;
    }else{
      this.Validador2 = true;
    }


    /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UN NÚMERO*/
    if (!this.claveUsuario || !/[0-9]/.test(this.claveUsuario)) {
      this.errores.push('La contraseña debe tener al menos 1 número');
      this.Validador3 = false;
    }else{
      this.Validador3 = true;
    }

     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS 8 CARACTERES*/
    if (!this.claveUsuario || this.claveUsuario.length <= 8) {
      this.errores.push('La contraseña debe tener al menos 8 caracteres');
      this.Validador4 = false;
    }else{
      this.Validador4 = true;
    }

     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UNA LETRA MINUSCULA*/
    if (!this.claveUsuario || !/[a-z]/.test(this.claveUsuario)) {
      this.errores.push('La contraseña debe tener al menos una letra minúcula');
      this.Validador6 = false;
    }else{
      this.Validador6 = true;
    }

     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UNA LETRA MAYUSCULA*/
    if (!this.claveUsuario || !/[A-Z]/.test(this.claveUsuario)) {
      this.errores.push('La contraseña debe tener al menos una letra mayúcula');
      this.Validador7 = false;
    }else{
      this.Validador7 = true;
    }

     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UN CARACTER ESPECIAL*/
    if (!this.claveUsuario || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/.test(this.claveUsuario)) {
      this.errores.push('La contraseña debe tener al menos 1 caracter especial');
      this.Validador8 = false;
    }else{
      this.Validador8 = true;
    }

    



// Si todas las validaciones pasan:
  if( this.Validador1 == true,this.Validador2 == true,this.Validador3 == true,this.Validador4 == true,this.Validador5 == true,this.Validador6 == true,this.Validador7 == true,this.Validador8 == true){
    try{
      this.db.insertarUsuario(this.rutUsuario,this.nombreUsuario,this.apellidoUsuario,this.fechaNacimiento,this.teleUsu,this.fotoUsu,this.correoUsuario,this.claveUsuario,this.preguntaUsuario,this.respuestaUsuario,"usuario");
      const successAlert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Su registro ha sido completado con éxito.',
        buttons: ['OK']
      });
      await successAlert.present();
      this.router.navigate(['/home']);
    }catch(error){
      this.db.presentAlert("LOL no agregado");
    }
  }else{
    const successAlert = await this.alertController.create({
      header: 'Registro Fallido',
      message: 'Revise sus credenciales.',
      buttons: ['OK']
      
    });
    await successAlert.present();
    return;
  }


  }

  ngOnInit() {
  }

}
