import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform,AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { Zapatillas } from './zapatillas';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
  public database!: SQLiteObject;

   producto: string= "CREATE TABLE IF NOT EXISTS  producto(id_producto INTEGER PRIMARY KEY autoincrement, nombreProducto VARCHAR(30) NOT NULL, descripcion VARCHAR(30) NOT NULL );";

   registroZapatillas: string= "INSERT or IGNORE INTO producto(id_producto,nombreProducto,descripcion) VALUES (10,'Nike', 'Soy una descripcion');";

   listaZapatillas= new BehaviorSubject([]);

   private isDBReady :  BehaviorSubject<boolean> = new  BehaviorSubject(false);
   
  constructor(private alertController: AlertController,private sqlite : SQLite, private platform : Platform) {
    this.crearBD();
  }
  dbState(){
    return this.isDBReady.asObservable();
  }
  fetchProducto(): Observable<Zapatillas[]>{
    return this.listaZapatillas.asObservable();
    
  }
  buscarZapatillas(){
    return this.database.executeSql('SELECT * FROM producto',[]).then(res=>
    {
      let items: Zapatillas[] = [];
      if(res.rows.length > 0){
        for(var i=0; i<res.rows.length; i++){
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombreProducto: res.rows.item(i).nombreProducto,
            descripcion: res.rows.item(i).descripcion
          })
        }
      }
      this.listaZapatillas.next(items as any);
    })
  }
  insertarZapatilla(nombreProducto:any, descripcion: any){
    return this.database.executeSql('INSERT INTO producto(nombreProducto,descripcion) VALUES (?,?)',[nombreProducto,descripcion]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al insertar" + e);
    })
  }
  actualizarProducto(id_producto: any, nombreProducto:any, descripcion:any, precio:any, stock:any){
    return this.database.executeSql('UPDATE producto SET nombreProducto = ?, descripcion = ? WHERE id_producto = ?',[nombreProducto,descripcion]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al actualizar" + e);
    })

  }
  eliminarProducto(id_producto: any){
    return this.database.executeSql('DELETE FROM producto WHERE id_producto = ?',[id_producto]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al eliminar" + e);
    })

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
        this.presentAlert("error en crear bd" + e);
      })
    })
  }

   async creaTablas(){
    try {
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.producto,[]);
  

       await this.database.executeSql(this.registroZapatillas,[]);

      this.isDBReady.next(true);
      this.buscarZapatillas();
      
    }catch (e) {
       //capturamos el error(poner una alerta)
       this.presentAlert("error al crear tablas" + e);
    }
  }


  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
