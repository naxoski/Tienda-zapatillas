import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform,AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';

import { Zapatillas } from './zapatillas';
import { Usuario } from './usuario';
import { Venta } from './venta';
import { Detalle } from './detalle';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
  public database!: SQLiteObject;
  private carrito: Zapatillas[] = [];
  private carritoSubject = new BehaviorSubject<Zapatillas[]>(this.carrito);

  //TABLAS
  rol: string= "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY autoincrement,nombrerol VARCHAR(30) NOT NULL);";
  pregunta: string= "CREATE TABLE IF NOT EXISTS pregunta(idpregunta INTEGER PRIMARY KEY autoincrement, nombrepregunta VARCHAR(30) NOT NULL);";
  categoria: string= "CREATE TABLE IF NOT EXISTS  categoria(idcategoria INTEGER PRIMARY KEY autoincrement, nombrecategoria VARCHAR(30) NOT NULL);";
  producto: string= "CREATE TABLE IF NOT EXISTS  producto(idproducto INTEGER PRIMARY KEY autoincrement, nombreproducto VARCHAR(30) NOT NULL, descripcion VARCHAR(30) NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL, foto BLOB NOT NULL,idcategoria INTEGER NOT NULL,  FOREIGN KEY(idcategoria) REFERENCES categoria(idcategoria) );";
  usuario: string="CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY autoincrement, rut VARCHAR(20) NOT NULL, nombreusuario VARCHAR(30) NOT NULL, apellidousuario VARCHAR(30) NOT NULL, fnacimiento DATE, telefono INTEGER , fotoperfil BLOB, correo VARCHAR(30) NOT NULL, clave VARCHAR(10) NOT NULL, respuesta VARCHAR(30) NOT NULL, idpregunta INTEGER NOT NULL, idrol INTEGER NOT NULL,FOREIGN KEY(idpregunta) REFERENCES pregunta(idpregunta), FOREIGN KEY(idrol) REFERENCES rol(idrol) );";
  venta: string = "CREATE TABLE IF NOT EXISTS venta(idventa INTEGER PRIMARY KEY autoincrement, fventa DATE, fdespacho DATE, estatus VARCHAR(30) NOT NULL, total VARCHAR(30) NOT NULL , carrito VARCHAR(30) NOT NULL, idusuario INTEGER NOT NULL, FOREIGN KEY(idusuario) REFERENCES usuario(idusuario) );";
  detalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY autoincrement, cantidad INTEGER NOT NULL , detalle VARCHAR(30), idproducto INTEGER NOT NULL, idventa INTEGER NOT NULL,FOREIGN KEY (idproducto) REFERENCES producto(idproducto),  FOREIGN KEY(idventa) REFERENCES venta(idventa) );";
  region: string = "CREATE TABLE IF NOT EXISTS region(idregion INTEGER PRIMARY KEY autoincrement, nombreregion VARCHAR(30) );";
  comuna: string = "CREATE TABLE IF NOT EXISTS comuna(idcomuna INTEGER PRIMARY KEY autoincrement, nombrecomuna VARCHAR(30), idregion INTEGER NOT NULL, FOREIGN KEY (idregion) REFERENCES region(idregion) );";
  direccion: string = "CREATE TABLE IF NOT EXISTS direccion(iddireccion INTEGER PRIMARY KEY, calle VARCHAR(30) numcasa INTEGER NOT NULL, codpostal INTEGER NOT NULL, idcomuna INTEGER NOT NULL, idusuario INTEGER NOT NULL,FOREIGN KEY(idcomuna) REFERENCES comuna(idcomuna), FOREIGN KEY(idusuario) REFERENCES usuario(idusuario) );";

  

   
   
   //REGISTROS
   registroCategoria: string = "INSERT or IGNORE INTO categoria(idcategoria,nombrecategoria) VALUES (1,'hombre');";

   registroCategoria2: string = "INSERT or IGNORE INTO categoria(idcategoria,nombrecategoria) VALUES (2,'mujer');";
   
   registroRol: string="INSERT or IGNORE INTO rol(idrol,nombrerol) VALUES(10,'usuario');";

   registroRol2: string="INSERT or IGNORE INTO rol(idrol,nombrerol) VALUES(20,'admin');";

   registroPregunta: string="INSERT or IGNORE INTO pregunta(idpregunta,nombrepregunta) VALUES(30, '¿Tienes mascotas?');";

   registroPregunta2: string="INSERT or IGNORE INTO pregunta(idpregunta,nombrepregunta) VALUES(40, '¿Tienes hermanos?');";

   registroPregunta3: string="INSERT or IGNORE INTO pregunta(idpregunta,nombrepregunta) VALUES(50, '¿Tienes pareja?');";

   registroUsuario: string="INSERT or IGNORE INTO usuario(idusuario,rut,nombreusuario,apellidousuario,fnacimiento,telefono,fotoperfil,correo,clave,respuesta,idpregunta,idrol) VALUES(500, '21.475.570-k','ignacio', 'huerta', '2004-01-05',123456789,'assets/chad.webp','ignaciohuerta8a@gmail.com','claveprueba123','si','¿Tienes pareja?','usuario');"

   registroUsuario2: string="INSERT or IGNORE INTO usuario(idusuario,rut,nombreusuario,apellidousuario,fnacimiento,telefono,fotoperfil,correo,clave,respuesta,idpregunta,idrol) VALUES(600, '21.475.571-k','ignacio', 'huerta', '2004-01-05',123456789,'assets/chad.webp','administrador@gmail.com','claveprueba123','si','¿Tienes pareja?','admin');"
   



   registroZapatillas: string = "INSERT or IGNORE INTO producto(idproducto, nombreproducto, descripcion, precio, stock, foto, idcategoria) VALUES (100, 'Nike', 'Soy una descripción', 100000, 50, 'assets/air jordan 1.webp', 'hombre');";


   listaZapatillas= new BehaviorSubject([]);

   listaUsuario= new BehaviorSubject([]);

   listaVenta= new BehaviorSubject([]);

   listaDetalle = new BehaviorSubject([]);

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
  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuario.asObservable();
  }
  
  fetchVenta(): Observable<Venta[]>{
    return this.listaVenta.asObservable();
  }

  fetchDetalle(): Observable<Detalle[]>{
    return this.listaDetalle.asObservable();
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
  buscarUsuarios(){
    return this.database.executeSql('SELECT * FROM usuario',[]).then(res=>{
      let items: Usuario[] = [];
      if(res.rows.length > 0){
        for(var i=0; i<res.rows.length; i++){
          items.push({
            idusuario: res.rows.item(i).idusuario,
            rut: res.rows.item(i).rut,
            nombreusuario: res.rows.item(i).nombreusuario,
            apellidousuario: res.rows.item(i).apellidousuario,
            fnacimiento: res.rows.item(i).fnacimiento,
            telefono: res.rows.item(i).telefono,
            fotoperfil: res.rows.item(i).fotoperfil,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            respuesta: res.rows.item(i).respuesta,
            idpregunta: res.rows.item(i).idpregunta,
            idrol: res.rows.item(i).idrol,
          })
        }
      }
      this.listaUsuario.next(items as any);
    })
  }

  buscarDetalle(){
    return this.database.executeSql('SELECT * FROM detalle',[]).then(res=>{
      let items: Detalle[] = [];
      if(res.rows.length > 0){
        for(var i=0; i<res.rows.length; i++){
          items.push({
            iddetalle: res.rows.item(i).iddetalle,
            cantidad: res.rows.item(i).cantidad,
            detalle: res.rows.item(i).detalle,
            idproducto: res.rows.item(i).idproducto,
            idventa : res.rows.item(i).idventa,
          })
        }
      }
      this.listaDetalle.next(items as any);
    })
  }

  buscarVenta(){
    return this.database.executeSql('SELECT * FROM venta ',[]).then(res=>{
      let items: Venta[] = [];
      if(res.rows.length > 0){
        for(var i=0; i<res.rows.length; i++){
          items.push({
            idventa: res.rows.item(i).idventa,
            fventa: res.rows.item(i).fventa,
            estatus: res.rows.item(i).estatus,
            total: res.rows.item(i).total,
            carrito : res.rows.item(i).total,
            idusuario: res.rows.item(i).idusuario,
          })
        }
      }
      this.listaVenta.next(items as any);
    })
  }





  buscarUsu(correo: any, clave: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.executeSql('SELECT correo, clave, idrol FROM usuario WHERE correo = ? AND clave = ?', [correo, clave])
        .then((res) => {
          // Si la consulta se ejecuta con éxito, verifica si se encontraron datos
          if (res.rows.length > 0) {
            // Si se encontraron datos, resuelve la promesa con los resultados
            resolve(res.rows.item(0)); // Devuelve el primer resultado encontrado
          } else {
            // Si no se encontraron datos, resuelve la promesa con un objeto nulo o un mensaje indicando la falta de coincidencias
            resolve(null); // O puedes enviar un mensaje específico: resolve({ mensaje: 'No se encontraron coincidencias' });
          }
        })
        .catch((error) => {
          // Si hay un error en la consulta, rechaza la promesa con el error
          reject('Error al ejecutar la consulta: ' + JSON.stringify(error));
        });
    });
  }
   async obtenerProducto(idproducto: any): Promise<any>{
    return new Promise((resolve, reject)=>{
      this.database.executeSql('SELECT * FROM producto WHERE idproducto = ?', [idproducto]).then((res)=>{
        if (res.rows.length > 0){
          resolve(res.rows.item(0));
        }else{
          resolve(null);
        }
      }).catch((error)=>{
        reject('Error al obtener el producto' + JSON.stringify(error));
      });
    });

   }

   async obtenerUsuario(idusuario :any): Promise<any>{
    return new Promise((resolve, reject)=>{
      this.database.executeSql('SELECT * FROM usuario WHERE idusuario = ?', [idusuario]).then((res)=>{
        if (res.rows.length > 0){
          resolve(res.rows.item(0));
        }else{
          resolve(null);
        }
      }).catch((error)=>{
        reject('Error al obtener el usuario' + JSON.stringify(error));
      });
    });

   }
   agregarAlCarrito(producto: Zapatillas) {
    this.carrito.push(producto);
    this.carritoSubject.next(this.carrito);
  }
  obtenerCarrito() {
    return this.carritoSubject.asObservable();
  }

 



  


 



  






  insertarZapatilla(nombreproducto:any, descripcion: any, precio : any, stock: any , foto: any , idcategoria: any){
    return this.database.executeSql('INSERT INTO producto(nombreproducto,descripcion,precio,stock,foto,idcategoria) VALUES (?,?,?,?,?,?)',[nombreproducto,descripcion,precio,stock,foto,idcategoria ]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al insertar zapatilla" + e);
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
  eliminarUsuario(idusuario: any){
    return this.database.executeSql('DELETE FROM usuario WHERE idusuario = ?',[idusuario]).then(res=>{
      this.buscarUsuarios();
    }).catch(e=>{
      this.presentAlert("error al eliminar" + e);
    })

  }
  insertarUsuario(nombreusuario:any, apellidousuario: any, rut : any, fnacimiento: any , telefono: any , fotoperfil: any,correo: any,clave: any,respuesta: any,idpregunta: any,idrol: any){
    return this.database.executeSql('INSERT INTO usuario(rut,nombreusuario,apellidousuario,fnacimiento,telefono,fotoperfil,correo,clave,respuesta,idpregunta,idrol) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[rut,nombreusuario,apellidousuario,fnacimiento,telefono,fotoperfil,correo,clave,respuesta,idpregunta,idrol]).then(res=>{
      this.buscarUsuarios();
    }).catch(e=>{
      this.presentAlert("error al insertar usuario" + e);
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
      await this.database.executeSql(this.rol,[]);

      await this.database.executeSql(this.pregunta,[]);

      await this.database.executeSql(this.usuario,[]);

      await this.database.executeSql(this.categoria,[]);

      await this.database.executeSql(this.producto,[]);



     
      
     


      await this.database.executeSql(this.registroRol,[]);
      await this.database.executeSql(this.registroRol2,[]);
      await this.database.executeSql(this.registroPregunta,[]);
      await this.database.executeSql(this.registroPregunta2,[]);
      await this.database.executeSql(this.registroPregunta3,[]);
      await this.database.executeSql(this.registroUsuario,[]);
      await this.database.executeSql(this.registroUsuario2,[]);

      await this.database.executeSql(this.registroCategoria,[]);
      await this.database.executeSql(this.registroCategoria2,[]);

      

      await this.database.executeSql(this.registroZapatillas,[]);


  


      this.isDBReady.next(true);
      this.buscarZapatillas();
      this.buscarUsuarios();
      
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
