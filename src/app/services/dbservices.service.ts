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

   Producto: string="CREATE TABLE IF NOT EXISTS  Producto(id_producto  INTEGER PRIMARY KEY autoincrement, nombreProducto VARCHAR(30) NOT NULL);";

   RegistroZapatillas: string="INSERT INTO OR IGNORE INTO Producto(id_producto,nombreProducto) VALUES(10,'Nike', 'Soy una descripcion');"

   listaZapatillas= new BehaviorSubject([]);

   private isDBReady :  BehaviorSubject<boolean> = new  BehaviorSubject(false);
   
  alertController: any;
  constructor(private sqlite : SQLite, private platform : Platform) {
    this.crearBD();
  }
  dbState(){
    return this.isDBReady.asObservable();
  }
  fetchProducto(): Observable<Zapatillas[]>{
    return this.listaZapatillas.asObservable();
    
  }
  buscarZapatillas(){
    return this.database.executeSql('SELECT * FROM Producto',[]).then(res=>
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
    return this.database.executeSql('INSERT INTO Producto(nombreProducto,descripcion) VALUES(?,?)',[nombreProducto, descripcion]).then(res=>{
      this.buscarZapatillas();
    })
  }
  actualizarProducto(id_producto: any, nombreProducto:any, descripcion:any, precio:any, stock:any){
    return this.database.executeSql('UPDATE Producto SET nombreProducto = ?, descripcion = ? WHERE id_producto = ?',[nombreProducto,descripcion]).then(res=>{
      this.buscarZapatillas();
    })

  }
  eliminarProducto(id_producto: any){
    return this.database.executeSql('DELETE FROM Producto WHERE id_producto = ?',[id_producto]).then(res=>{
      this.buscarZapatillas();
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
        this.presentAlert("error" + e);
      })
    })
  }

   async creaTablas(){
    try {
      //ejecutar la creacion de tablas
  await this.database.executeSql(this.Producto, []);
  

       await this.database.executeSql(this.RegistroZapatillas, []);

      this.isDBReady.next(true);
      this.buscarZapatillas();
      
    }catch (e) {
       //capturamos el error(poner una alerta)
       this.presentAlert("error" + e);
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
