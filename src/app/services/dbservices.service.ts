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

  //TABLAS
   rol: string= "CREATE TABLE IF NOT EXISTS  rol(id_rol INTEGER PRIMARY KEY autoincrement, nombreRol VARCHAR(30) NOT NULL);";

   pregunta: string= "CREATE TABLE IF NOT EXISTS  pregunta(id_pregunta INTEGER PRIMARY KEY autoincrement, nombrePregunta VARCHAR(30) NOT NULL);";

   categoria: string= "CREATE TABLE IF NOT EXISTS  categoria(id_categoria INTEGER PRIMARY KEY autoincrement, nombreCategoria VARCHAR(30) NOT NULL);";

   producto: string= "CREATE TABLE IF NOT EXISTS  producto(id_producto INTEGER PRIMARY KEY autoincrement, nombreProducto VARCHAR(30) NOT NULL, descripcion VARCHAR(30) NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL, imagen BLOB, id_categoria INTEGER NOT NULL, FOREIGN KEY(id_categoria) REFERENCES categoria(id_categoria) );";

   usuario: string= "CREATE TABLE IF NOT EXISTS  usuario(id_usuario INTEGER PRIMARY KEY autoincrement, rut VARCHAR(20) NOT NULL, nombreUsuario VARCHAR(100) NOT NULL, apellidoUsuario VARCHAR(100) NOT NULL, f_nacimiento DATE, telefono INTEGER, foto BLOB, correo VARCHAR(100),clave VARCHAR(20), respuesta VARCHAR(20), id_pregunta INTEGER, id_rol INTEGER, FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta), FOREIGN KEY (id_rol) REFERENCES rol(id_rol)  );";
   
   venta: string= "CREATE TABLE IF NOT EXISTS  venta(id_venta INTEGER PRIMARY KEY autoincrement, f_venta DATE, f_despacho DATE, estatus VARCHAR (15) NOT NULL, total VARCHAR(20),carrito VARCHAR(20), id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) );";

   detalle: string= "CREATE TABLE IF NOT EXISTS  detalle(id_detalle INTEGER PRIMARY KEY autoincrement, cantidad INTEGER, id_producto INTEGER, id_venta INTEGER, FOREIGN KEY(id_producto) REFERENCES producto(id_producto), FOREIGN KEY(id_venta) REFERENCES venta(id_venta) );";


   
   
   //REGISTROS

   registroCategoria: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombreCategoria VALUES (1,'hombre');";

   registroCategoria2: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombreCategoria VALUES (2,'mujer');";

   registroZapatillas: string = "INSERT or IGNORE INTO producto(id_producto, nombreProducto, descripcion, precio, stock, foto, id_categoria) VALUES (10, 'Nike', 'Soy una descripción', 100000, 50, 'assets/air jordan 1.webp', 1);";


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
    return this.database.executeSql('SELECT p.* c.nombreCategoria AS categoria FROM producto AS p LEFT JOIN categoria AS c ON p.id_categoria = c.id_categoria',[]).then(res=>
    {
      let items: Zapatillas[] = [];
      if(res.rows.length > 0){
        for(var i=0; i<res.rows.length; i++){
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombreProducto: res.rows.item(i).nombreProducto,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            foto:res.rows.item(i).foto,
            categoria: res.rows.item(i).categoria,
          })
        }
      }
      this.listaZapatillas.next(items as any);
    })
  }
  insertarZapatilla(nombreProducto:any, descripcion: any, precio : any, stock: any , foto: any , categoria: any){
    return this.database.executeSql('INSERT INTO producto(nombreProducto,descripcion,precio,stock,foto,categoria) VALUES (?,?,?,?,?,?)',[nombreProducto,descripcion,precio,stock,foto,categoria ]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al insertar" + e);
    })
  }
  actualizarProducto(id_producto: any, nombreProducto:any, descripcion:any, precio:any, stock:any, foto: any ,categoria: any){
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
      await this.database.executeSql(this.rol,[]);
      await this.database.executeSql(this.pregunta,[]);
      await this.database.executeSql(this.categoria,[]);
      await this.database.executeSql(this.usuario,[]);
      await this.database.executeSql(this.venta,[]);
      await this.database.executeSql(this.detalle,[]);
  

      await this.database.executeSql(this.registroZapatillas,[]);
      await this.database.executeSql(this.registroCategoria,[]);
      await this.database.executeSql(this.registroCategoria2,[]);

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
