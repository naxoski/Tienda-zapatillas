import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform,AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';

import { Zapatillas } from './zapatillas';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
  public database!: SQLiteObject;

  //TABLAS
  

   

  categoria: string= "CREATE TABLE IF NOT EXISTS  categoria(idcategoria INTEGER PRIMARY KEY autoincrement, nombrecategoria VARCHAR(30) NOT NULL);";

  producto: string= "CREATE TABLE IF NOT EXISTS  producto(idproducto INTEGER PRIMARY KEY autoincrement, nombreproducto VARCHAR(30) NOT NULL, descripcion VARCHAR(30) NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL, foto BLOB NOT NULL,idcategoria INTEGER NOT NULL,  FOREIGN KEY(idcategoria) REFERENCES categoria(idcategoria) );";

  

   
   
   //REGISTROS

   registroCategoria: string = "INSERT OR IGNORE INTO categoria(idcategoria,nombrecategoria) VALUES (1,'hombre');";

   registroCategoria2: string = "INSERT OR IGNORE INTO categoria(idcategoria,nombrecategoria) VALUES (2,'mujer');";

   registroZapatillas: string = "INSERT or IGNORE INTO producto(idproducto, nombreproducto, descripcion, precio, stock, foto, idcategoria) VALUES (100, 'Nike', 'Soy una descripción', 100000, 50, 'assets/air jordan 1.webp', 'hombre');";


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
            idproducto: res.rows.item(i).idproducto,
            nombreproducto: res.rows.item(i).nombreproducto,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            foto:res.rows.item(i).foto,
            idcategoria: res.rows.item(i).idcategoria,
          })
        }
      }
      this.listaZapatillas.next(items as any);
    })
  }
  insertarZapatilla(nombreproducto:any, descripcion: any, precio : any, stock: any , foto: any , idcategoria: any){
    return this.database.executeSql('INSERT INTO producto(nombreproducto,descripcion,precio,stock,foto,idcategoria) VALUES (?,?,?,?,?,?)',[nombreproducto,descripcion,precio,stock,foto,idcategoria ]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al insertar" + e);
    })
  }
  actualizarProducto(idproducto: any, nombreproducto:any, descripcion:any, precio:any, stock:any, foto: any ,categoria: any){
    return this.database.executeSql('UPDATE producto SET nombreproducto = ?, descripcion = ? WHERE id_producto = ?',[nombreproducto,descripcion]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al actualizar" + e);
    })

  }
  eliminarProducto(idproducto: any){
    return this.database.executeSql('DELETE FROM producto WHERE idproducto = ?',[idproducto]).then(res=>{
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

      await this.database.executeSql(this.categoria,[]);

      await this.database.executeSql(this.producto,[]);
     
      
     

      await this.database.executeSql(this.registroCategoria,[]);
      await this.database.executeSql(this.registroCategoria2,[]);

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
      header: 'Aviso',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  }
}
