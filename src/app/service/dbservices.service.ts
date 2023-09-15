import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { Zapatillas } from '../services/zapatillas';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
  public database!: SQLiteObject;
   Rol: string="CREATE TABLE IF NOT EXISTS Rol(id_rol  INTEGER PRIMARY KEY autoincrement, nombrerol VARCHAR (30) NOTNULL);";

   Pregunta: string="CREATE TABLE IF NOT EXISTS Pregunta(id_pregunta  INTEGER PRIMARY KEY autoincrement, nombrePregunta VARCHAR (30) NOTNULL);";

   Categoria: string="CREATE TABLE IF NOT EXISTS Categoria(id_catego  INTEGER PRIMARY KEY autoincrement, nombreCategoria VARCHAR (30) NOTNULL);";

   Producto: string="CREATE TABLE IF NOT EXISTS  Producto(id_producto  INTEGER PRIMARY KEY autoincrement, nombreProducto VARCHAR (30) NOTNULL, descripcion VARCHAR (50) NOTNULL, precio INTEGER NOTNULL, stock INTEGER NOTNULL, foto IMAGE);";
   
   Usuario: string="CREATE TABLE IF NOT EXISTS Usuario(id_usuario  INTEGER PRIMARY KEY autoincrement, rut VARCHAR (30) NOTNULL, nombreUsuario VARCHAR (30) NOTNULL, apellidoUsuario VARCHAR (30) NOTNULL, f_nacimiento DATE  NOTNULL, telefono  INTEGER NOTNULL, foto IMAGE  NOTNULL, correo EMAIL  NOTNULL, clave VARCHAR (30) NOTNULL, respuesta VARCHAR (30) NOTNULL, pregunta VARCHAR (30) NOTNULL, rol FOREIGN KEY );";

   Venta: string="CREATE TABLE IF NOT EXISTS Venta(id_venta  INTEGER PRIMARY KEY autoincrement, f_venta DATE NOTNULL, f_despacho DATE NOTNULL, estatus VARCHAR (30) NOTNULL, total VARCHAR (30) NOTNULL, carrito VARCHAR (30) NOTNULL, usuario FOREIGN KEY );";

   Detalle: string="CREATE TABLE IF NOT EXISTS Detalle(id_detalle  INTEGER PRIMARY KEY autoincrement, cantidad INTEGER NOTNULL, detalle VARCHAR (30) NOTNULL, producto FOREIGN KEY NOTNULL, venta FOREIGN KEY NOTNULL );";

   Region: string="CREATE TABLE IF NOT EXISTS Region(id_region  INTEGER PRIMARY KEY autoincrement, nombreRegion VARCHAR (30) NOTNULL);";

   Direccion: string="CREATE TABLE IF NOT EXISTS Direccion(id_direccion  INTEGER PRIMARY KEY autoincrement, calle VARCHAR (30) NOTNULL, numcasa INTEGER NOTNULL, codpostal INTEGER NOTNULL, comuna VARCHAR(30) NOTNULL, usuario FOREIGN KEY NOTNULL);";




   RegistroZapatillas: string="INSERT INTO OR IGNORE INTO producto(id_producto,nombreproducto,descripcion, precio, stock, foto, categoria) VALUES(10,'Nike', 'Soy una descripcion','1500', '20', );"

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
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
          })
        }
      }
      this.listaZapatillas.next(items as any);
    })
  }
  insertarZapatilla(nombreProducto:any, descripcion: any,precio:any,stock:any){
    return this.database.executeSql('INSERT INTO Producto(nombreProducto,descripcion,precio,stock) VALUES(?,?,?,?)',[nombreProducto, descripcion, precio, stock]).then(res=>{
      this.buscarZapatillas();
    })
  }
  actualizarProducto(id_producto: any, nombreProducto:any, descripcion:any, precio:any, stock:any){
    return this.database.executeSql('UPDATE Producto SET nombreProducto = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?',[nombreProducto,descripcion,precio,stock]).then(res=>{
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
      this.buscarZapatillas();
      
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
