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
   tablaZapatillas: string="CREATE TABLE IF NOT EXISTS noticia(id  INTEGER PRIMARY KEY autoincrement, titulo VARCHAR (30) NOTNULL,texto VARCHAR(300) NOTNULL);";

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
       await this.database.executeSql(this.tablaZapatillas, []);

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
