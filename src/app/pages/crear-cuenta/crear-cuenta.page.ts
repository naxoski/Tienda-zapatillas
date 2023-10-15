import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {
  rut= "";
  nombre="";
  apellido="";
  fnacimiento= "";
  telefono= "";
  fotoperfil= "";
  correo= "";
  clave= "";
  clave2= "";
  respuesta= "";
  pregunta= "";
  mensajeErrorNombre: string = '';
  mensajeErrorApellido: string = '';
  mensajeErrorContra2: string = '';
  errores: string[] = [];

  Validador1 = false;
  Validador2 = false;
  Validador3 = false;
  Validador4 = false;
  Validador5 = false;
  Validador6 = false;
  Validador7 = false;
  Validador8 = false;


 


  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController, private db: DbservicesService) { }
  valiRut(event: KeyboardEvent) {
    const input = event.key;
  
    // Verifica si el input es un número o una 'k' (puede ser minúscula o mayúscula)
    const regex = /^[0-9kK]$/i;
  
    if (!regex.test(input) && input !== 'Backspace') {
      event.preventDefault(); // No permite caracteres no válidos excepto Backspace
    } else if (input !== 'Backspace') {
      if (input.match(/[0-9kK]/i)) {
        if (this.rut.length === 2 || this.rut.length === 6) {
          this.rut = this.rut + '.';
        } else if (this.rut.length === 10) {
          this.rut = this.rut + '-';
        }
  
        if (this.rut.length > 11) {
          event.preventDefault(); // No permite más caracteres después de la posición 11
        }
        if (this.rut.length === 12 && input === '0') {
          this.rut = this.rut.slice(0, -1) + 'k';
          event.preventDefault(); 
        }
      }
    }
  }
  async crear() {

    this.errores = [];
    this.mensajeErrorApellido = "";
    this.mensajeErrorNombre = "";
    this.mensajeErrorContra2 = "";

    // Validación de números en nombre y apellido
    if (/[0-9]/.test(this.nombre)) {
      this.mensajeErrorNombre = 'No se permiten números en el nombre';
      this.Validador1 = false;
    }
    else{
      this.Validador1 = true;
    }

    if (/[0-9]/.test(this.apellido)) {
      this.mensajeErrorApellido = 'No se permiten números en el apellido';
      this.Validador2 = false;
    }else{
      this.Validador2 = true;
    }

    /* VALIDACIONES DE LA CONTRASEÑA */



    /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UN NÚMERO*/
    if (!this.clave || !/[0-9]/.test(this.clave)) {
      this.errores.push('La contraseña debe tener al menos 1 número');
      this.Validador3 = false;
    }else{
      this.Validador3 = true;
    }





     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS 8 CARACTERES*/
    if (!this.clave || this.clave.length <= 8) {
      this.errores.push('La contraseña debe tener al menos 8 caracteres');
      this.Validador4 = false;
    }else{
      this.Validador4 = true;
    }




     /*VALIDA QUE LA CONTRASEÑA SEA IGUAL A LA QUE SE REPITE*/
    if (!this.clave || !this.clave2 || this.clave !== this.clave2) {
      this.mensajeErrorContra2 = 'Las contraseñas deben ser iguales';
      this.Validador5 = false;
    }else{
      this.Validador5 = true;
    }



     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UNA LETRA MINUSCULA*/
    if (!this.clave || !/[a-z]/.test(this.clave)) {
      this.errores.push('La contraseña debe tener al menos una letra minúcula');
      this.Validador6 = false;
    }else{
      this.Validador6 = true;
    }



     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UNA LETRA MAYUSCULA*/
    if (!this.clave || !/[A-Z]/.test(this.clave)) {
      this.errores.push('La contraseña debe tener al menos una letra mayúcula');
      this.Validador7 = false;
    }else{
      this.Validador7 = true;
    }




     /*VALIDA QUE LA CONTRASEÑA TENGA AL MENOS UN CARACTER ESPECIAL*/
    if (!this.clave || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/.test(this.clave)) {
      this.errores.push('La contraseña debe tener al menos 1 caracter especial');
      this.Validador8 = false;
    }else{
      this.Validador8 = true;
    }
  
    



  // Si todas las validaciones pasan:
  if( this.Validador1 == true,this.Validador2 == true,this.Validador3 == true,this.Validador4 == true,this.Validador5 == true,this.Validador6 == true,this.Validador7 == true,this.Validador8 == true){
    try{
      this.db.insertarUsuario(this.rut,this.nombre,this.apellido,this.fnacimiento,this.telefono,this.fotoperfil,this.correo,this.clave,this.respuesta,this.pregunta,"usuario");
      const successAlert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Su registro ha sido completado con éxito.',
        buttons: ['OK']
      });
      await successAlert.present();
      this.router.navigate(['/home']);
    }catch(error){
      this.db.presentAlert("Usuario no agregado"); 
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








    

 

