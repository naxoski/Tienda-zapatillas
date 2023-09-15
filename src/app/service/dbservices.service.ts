import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
  public database!: SQLiteObject;
   Rol: string="CREATE TABLE IF NOT EXISTS noticia(id_rol  INTEGER PRIMARY KEY autoincrement, nombrerol VARCHAR (30) NOTNULL);";

   Pregunta: string="CREATE TABLE IF NOT EXISTS noticia(id_pregunta  INTEGER PRIMARY KEY autoincrement, nombrePregunta VARCHAR (30) NOTNULL);";

   Categoria: string="CREATE TABLE IF NOT EXISTS noticia(id_catego  INTEGER PRIMARY KEY autoincrement, nombreCategoria VARCHAR (30) NOTNULL);";

   Producto: string="CREATE TABLE IF NOT EXISTS noticia(id_producto  INTEGER PRIMARY KEY autoincrement, nombreProducto VARCHAR (30) NOTNULL, descripcion VARCHAR (50) NOTNULL, precio INTEGER NOTNULL, stock INTEGER NOTNULL, foto IMAGE NOTNULL, categoria FOREIGN KEY);";
   
   Usuario: string="CREATE TABLE IF NOT EXISTS noticia(id_usuario  INTEGER PRIMARY KEY autoincrement, rut VARCHAR (30) NOTNULL, nombreUsuario VARCHAR (30) NOTNULL, apellidoUsuario VARCHAR (30) NOTNULL, f_nacimiento DATE  NOTNULL, telefono  INTEGER NOTNULL, foto IMAGE  NOTNULL, correo EMAIL  NOTNULL, clave VARCHAR (30) NOTNULL, respuesta VARCHAR (30) NOTNULL, pregunta VARCHAR (30) NOTNULL, rol FOREIGN KEY );";

   Venta: string="CREATE TABLE IF NOT EXISTS noticia(id_venta  INTEGER PRIMARY KEY autoincrement, f_venta DATE NOTNULL, f_despacho DATE NOTNULL, estatus VARCHAR (30) NOTNULL, total VARCHAR (30) NOTNULL, carrito VARCHAR (30) NOTNULL, usuario FOREIGN KEY );";

   Detalle: string="CREATE TABLE IF NOT EXISTS noticia(id_detalle  INTEGER PRIMARY KEY autoincrement, cantidad INTEGER NOTNULL, detalle VARCHAR (30) NOTNULL, producto FOREIGN KEY NOTNULL, venta FOREIGN KEY NOTNULL );";

   Region: string="CREATE TABLE IF NOT EXISTS noticia(id_region  INTEGER PRIMARY KEY autoincrement, nombreRegion VARCHAR (30) NOTNULL);";

   Direccion: string="CREATE TABLE IF NOT EXISTS noticia(id_direccion  INTEGER PRIMARY KEY autoincrement, calle VARCHAR (30) NOTNULL, numcasa INTEGER NOTNULL, codpostal INTEGER NOTNULL, comuna VARCHAR(30) NOTNULL, usuario FOREIGN KEY NOTNULL);";




   RegistroZapatillas: string="INSERT INTO OR IGNORE INTO noticia(id,titulo,texto) VALUES(1,'Soy un titulo'', 'Soy un texto');"

   listaZapatillas= new BehaviorSubject([]);

   private isDBReady :  BehaviorSubject<boolean> = new  BehaviorSubject(false);
  alertController: any;
  constructor(private sqlite : SQLite, private platform : Platform) {
    this.crearBD();
  }

  //Creacion base de datos
  crearBD(){
    //verifiacion
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name:'dbzapatillas.db',
        location: 'default'
      }).then((db : SQLiteObject)=>{
        //Guardar dentro variable
        this.database = db;
        //llamar funcion que crea las tablas
        this.creaTablas();
      }).catch(e=>{
        //capturamos el error(poner una alerta)
        this.presentAlert("error" + e);
      })
    })
  }

   async creaTablas(){
    try {
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.Rol, []);
      await this.database.executeSql(this.Pregunta, []);
      await this.database.executeSql(this.Categoria, []);
      await this.database.executeSql(this.Producto, []);
      await this.database.executeSql(this.Usuario, []);
      await this.database.executeSql(this.Venta, []);
      await this.database.executeSql(this.Detalle, []);
      await this.database.executeSql(this.Region, []);
      await this.database.executeSql(this.Detalle, []);


       await this.database.executeSql(this.RegistroZapatillas, []);

      this.isDBReady.next(true);
      
    }catch (e) {
       //capturamos el error(poner una alerta)
       this.presentAlert("error" + e);
    }
  }
  async presentAlert(msj:string) {
    
      const alert = await this.alertController.create({
        header: 'Campos Incompletos',
        message: 'Complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();

    }
}
