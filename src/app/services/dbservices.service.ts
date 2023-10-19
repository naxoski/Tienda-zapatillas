import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform,AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, firstValueFrom, from, of, throwError } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Zapatillas } from './zapatillas';
import { Usuario } from './usuario';
import { Venta } from './venta';
import { Detalle } from './detalle';
import { Detallecomprado } from './detallecomprado';
import { Detallesventa } from './detallesventa';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
  public database!: SQLiteObject;

  //TABLAS
  rol: string= "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY autoincrement,nombrerol VARCHAR(30) NOT NULL);";
  pregunta: string= "CREATE TABLE IF NOT EXISTS pregunta(idpregunta INTEGER PRIMARY KEY autoincrement, nombrepregunta VARCHAR(30) NOT NULL);";
  categoria: string= "CREATE TABLE IF NOT EXISTS  categoria(idcategoria INTEGER PRIMARY KEY autoincrement, nombrecategoria VARCHAR(30) NOT NULL);";
  producto: string= "CREATE TABLE IF NOT EXISTS  producto(idproducto INTEGER PRIMARY KEY autoincrement, nombreproducto VARCHAR(30) NOT NULL, descripcion VARCHAR(30) NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL, foto BLOB NOT NULL,idcategoria INTEGER NOT NULL,  FOREIGN KEY(idcategoria) REFERENCES categoria(idcategoria) );";
  usuario: string="CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY autoincrement, rut VARCHAR(20) NOT NULL, nombreusuario VARCHAR(30) NOT NULL, apellidousuario VARCHAR(30) NOT NULL, fnacimiento DATE, telefono INTEGER , fotoperfil BLOB, correo VARCHAR(30) NOT NULL, clave VARCHAR(10) NOT NULL, respuesta VARCHAR(30) NOT NULL, idpregunta INTEGER NOT NULL, idrol INTEGER NOT NULL,FOREIGN KEY(idpregunta) REFERENCES pregunta(idpregunta), FOREIGN KEY(idrol) REFERENCES rol(idrol) );";
  venta: string = "CREATE TABLE IF NOT EXISTS venta(idventa INTEGER PRIMARY KEY autoincrement, fventa DATE, fdespacho DATE, estatus VARCHAR(30) NOT NULL, total INTEGER NOT NULL , carrito VARCHAR(30) NOT NULL, idusuario INTEGER NOT NULL, FOREIGN KEY(idusuario) REFERENCES usuario(idusuario) );";
  detalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY autoincrement, cantidad INTEGER NOT NULL , detalle INTEGER NOT NULL, idproducto INTEGER NOT NULL, idventa INTEGER NOT NULL,FOREIGN KEY (idproducto) REFERENCES producto(idproducto),  FOREIGN KEY(idventa) REFERENCES venta(idventa) );";
  detalleComprado: string ="CREATE TABLE IF NOT EXISTS detallecomprado(iddetallec INTEGER PRIMARY KEY AUTOINCREMENT, nombreprodc TEXT NOT NULL, fotoprodc TEXT NOT NULL, cantidadc INTEGER NOT NULL, subtotalc INTEGER NOT NULL, ventac INTEGER NOT NULL, FOREIGN KEY (ventac) REFERENCES venta(idventa) );";

  

   
   
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
   
   listaDetalleComprado = new BehaviorSubject([]);

   listaDetallesVenta = new BehaviorSubject([]);

   private isDBReady :  BehaviorSubject<boolean> = new  BehaviorSubject(false);
   private flag: BehaviorSubject<boolean> = new BehaviorSubject(false);

   
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
  fetchDetalleComprado(): Observable<Detallecomprado[]>{
    return this.listaDetalleComprado.asObservable();
  }

  promiseDetalle(): Promise<Detalle[]> {
    return firstValueFrom(this.listaDetalle);
  }
  
  promiseVenta(): Promise<Venta[]> {
    return firstValueFrom(this.listaVenta);
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
            fdespacho: res.rows.item(i).fdespacho,
            estatus: res.rows.item(i).estatus,
            total: res.rows.item(i).total,
            carrito : res.rows.item(i).carrito,
            idusuario: res.rows.item(i).idusuario
          })
        }
      }
      this.listaVenta.next(items as any);
    })
  }
  
  buscarVentas(idventa : any){
    return this.database.executeSql('SELECT * FROM venta WHERE idventa = ? ',[idventa]).then(res=>{
      let items: Venta[] = [];
      if(res.rows.length > 0){
        for(var i=0; i<res.rows.length; i++){
          items.push({
            idventa: res.rows.item(i).idventa,
            fventa: res.rows.item(i).fventa,
            fdespacho: res.rows.item(i).fdespacho,
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
  buscarVentaCarrito(usuario: any, estado: any): Observable<Venta[]> {
    console.log("ID del usuario que recibio la busqueda del carrito: "+usuario);
    return new Observable<Venta[]>(observer => {
      this.database.executeSql("SELECT * FROM venta WHERE idusuario = ? AND estatus = ?;", [usuario, estado]).then(res => {
        let items: Venta[] = [];
  
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              idventa: res.rows.item(i).idventa,
              fventa: res.rows.item(i).fventa,
              fdespacho: res.rows.item(i).fdespacho,
              estatus: res.rows.item(i).estatus,
              total: res.rows.item(i).total,
              carrito : res.rows.item(i).total,
              idusuario: res.rows.item(i).idusuario,
            });
          }
        }
  
        observer.next(items);
        observer.complete();
      });
    });
  }
  buscarCompras(estado: any): Observable<Venta[]> {
    return new Observable<Venta[]>(observer => {
      this.database.executeSql("SELECT * FROM venta WHERE estatus = ?;", [estado]).then(res => {
        let items: Venta[] = [];
  
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              idventa: res.rows.item(i).idventa,
            fventa: res.rows.item(i).fventa,
            fdespacho: res.rows.item(i).fdespacho,
            estatus: res.rows.item(i).estatus,
            total: res.rows.item(i).total,
            carrito : res.rows.item(i).total,
            idusuario: res.rows.item(i).idusuario,
            });
          }
        }
  
        observer.next(items);
        observer.complete();
      });
    });
  }

  buscarDetalles(iddetalle: any){
    return this.database.executeSql('SELECT * FROM detalle',[iddetalle]).then(res=>{
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
  buscarDetalleProd(prod: any, venta: any): Observable<Detalle[]> {
    return new Observable<Detalle[]>(observer => {
      this.database.executeSql("SELECT * FROM detalle WHERE idproducto = ? AND idventa = ?;", [prod, venta]).then(res => {
        let items: Detalle[] = [];
  
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
            iddetalle: res.rows.item(i).iddetalle,
            cantidad: res.rows.item(i).cantidad,
            detalle: res.rows.item(i).detalle,
            idproducto: res.rows.item(i).idproducto,
            idventa : res.rows.item(i).idventa,
            });
          }
        }
  
        observer.next(items);
        observer.complete();
      });
    });
  }
  buscarDetallesVenta(venta: any): Observable<Detallesventa[]> {
    return new Observable<Detallesventa[]>(observer => {
      this.database.executeSql("SELECT d.iddetalle, d.cantidad, d.detalle, d.idproducto ,d.idventa, p.nombreproducto, p.precio, p.stock, p.foto FROM detalle d JOIN producto p ON(d.idproducto = p.idproducto) WHERE idventa = ?;", [venta]).then(res => {
        let items: Detallesventa[] = [];
  
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              iddetalle: res.rows.item(i).iddetalle,
              cantidad: res.rows.item(i).cantidad,
              detalle: res.rows.item(i).detalle,
              idventa: res.rows.item(i).idventa,
              idproducto: res.rows.item(i).idproducto,
              nombreproducto: res.rows.item(i).nombreproducto,
              precio: res.rows.item(i).precio,
              stock: res.rows.item(i).stock,
              foto: res.rows.item(i).foto
            });
          }
        }
  
        observer.next(items);
        observer.complete();
      });
    });
  }
  
  buscarDetallesVentaPorD(id: any): Observable<Detallesventa[]> {
    return new Observable<Detallesventa[]>(observer => {
      this.database.executeSql("SELECT d.iddetalle, d.cantidad, d.detalle, d.idventa ,d.idproducto, p.nombreproducto, p.precio, p.stock, p.foto FROM detalle d JOIN producto p ON(d.idproducto = p.idproducto) WHERE d.iddetalle = ?;", [id]).then(res => {
        let items: Detallesventa[] = [];
  
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              iddetalle: res.rows.item(i).iddetalle,
              cantidad: res.rows.item(i).cantidad,
              detalle: res.rows.item(i).detalle,
              idventa: res.rows.item(i).idventa,
              idproducto: res.rows.item(i).idproducto,
              nombreproducto: res.rows.item(i).nombreproducto,
              precio: res.rows.item(i).precio,
              stock: res.rows.item(i).stock,
              foto: res.rows.item(i).foto
            });
          }
        }
  
        observer.next(items);
        observer.complete();
      });
    });
  }
  buscarDetallesCompra(){
    return this.database.executeSql("SELECT * FROM detallecomprado;",[]).then(res =>{
      //todo bien
      let items: Detallecomprado[] = [];
      //Validar cantidad registros
      if(res.rows.length > 0){
        //Recorrer los datos
        for(var i = 0; i < res.rows.length; i++ ){
          //Guardando los datos
          items.push({ 
            iddetallec: res.rows.item(i).iddetallec,
            nombreprodc: res.rows.item(i).nombreprodc,
            fotoprodc: res.rows.item(i).fotoProdc,
            cantidadc: res.rows.item(i).cantidadc,
            subtotalc: res.rows.item(i).subtotalc,
            ventac: res.rows.item(i).ventac
           });
        }
      }
      this.listaDetalleComprado.next(items as any);

    })
  }
  buscarDetallesCompraVenta(venta: any): Observable<Detallecomprado[]> {
    return new Observable<Detallecomprado[]>(observer => {
      this.database.executeSql("SELECT * FROM detallecomprado WHERE ventac = ?;", [venta]).then(res => {
        let items: Detallecomprado[] = [];
  
        // Validar cantidad de registros
        if (res.rows.length > 0) {
          // Recorrer los datos
          for (var i = 0; i < res.rows.length; i++) {
            // Guardando los datos
            items.push({ 
              iddetallec: res.rows.item(i).iddetallec,
              nombreprodc: res.rows.item(i).nombreprodc,
              fotoprodc: res.rows.item(i).fotoprodc,
              cantidadc: res.rows.item(i).cantidadc,
              subtotalc: res.rows.item(i).subtotalc,
              ventac: res.rows.item(i).ventac
            });
          }
        }
  
        observer.next(items);
        observer.complete();
      });
    });
  }
  restarStock(id: any, stock: any){  
    console.log("Stock recibido: "+stock);
    return this.database.executeSql("UPDATE producto SET stock = ? WHERE idproducto = ?",[stock, id]).then(res =>{
      this.buscarZapatillas();
    })
  }
   //Venta/carrito
   modificarEstadoVenta(id: any, fecha: any){  
    return this.database.executeSql("UPDATE venta SET estatus = ? WHERE idventa = ?",[fecha, id]).then(res =>{
      this.buscarVenta();
    })
  }
  modificarFechaEntrega(id: any, estado: any){  
    return this.database.executeSql("UPDATE venta SET fdespacho = ? WHERE idventa = ?",[estado, id]).then(res =>{
      this.buscarVenta();
    })
  }
  modificarEntrega(id: any, entrega: any){  
    return this.database.executeSql("UPDATE venta SET fdespacho = ? WHERE idventa = ?",[entrega, id]).then(res =>{
      this.buscarVenta();
    })
  }
  modificarTotal(id: any, total: any){  
    return this.database.executeSql("UPDATE venta SET total = ? WHERE idventa = ?",[total, id]).then(res =>{
      this.buscarVenta();
    })
  }
  modificarDetalle(id: any, detalle: any, cantidad: any){  
    console.log("Id del detalle que se quiere modificar"+id);
    console.log("Subtotal nuevo del detalle: "+detalle);
    console.log("Cantidad nueva del detalle: "+cantidad);
    return this.database.executeSql("UPDATE detalle SET detalle = ?, cantidad = ? WHERE iddetalle = ?",[detalle, cantidad, id]).then(res =>{
      this.buscarDetalle();
    })
  }






  buscarUsu(correo: any, clave: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.executeSql('SELECT idusuario, correo, clave, idrol FROM usuario WHERE correo = ? AND clave = ?', [correo, clave])
        .then((res) => {
          // Si la consulta se ejecuta con éxito, verifica si se encontraron datos
          if (res.rows.length > 0) {
            // Obtiene el primer resultado encontrado
            const usuario = res.rows.item(0);
            // Guarda el idusuario en el localStorage
            localStorage.setItem('idusuario', usuario.idusuario.toString()); // Convierte a cadena si es necesario
            // Resuelve la promesa con el objeto de usuario
            resolve(usuario);
          } else {
            // Si no se encontraron datos, resuelve la promesa con null o un mensaje indicando la falta de coincidencias
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

 



  




  insertarZapatilla(nombreproducto:any, descripcion: any, precio : any, stock: any , foto: any , idcategoria: any){
    return this.database.executeSql('INSERT INTO producto(nombreproducto,descripcion,precio,stock,foto,idcategoria) VALUES (?,?,?,?,?,?)',[nombreproducto,descripcion,precio,stock,foto,idcategoria ]).then(res=>{
      this.buscarZapatillas();
    }).catch(e=>{
      this.presentAlert("error al insertar zapatilla" + e);
    })
  }
  insertarVenta(fventa:any,fdespacho:any, estatus: any, total : any, carrito: any , idusuario: any ){
    console.log("Fecha despascho ingresada: "+fventa);
    console.log("Fecha despascho ingresada: "+fdespacho);
    console.log("Fecha despascho ingresada: "+estatus);
    console.log("Fecha despascho ingresada: "+total);
    console.log("Fecha despascho ingresada: "+carrito);
    console.log("Fecha despascho ingresada: "+idusuario);
    return this.database.executeSql('INSERT INTO venta(fventa,fdespacho,estatus,total,carrito,idusuario) VALUES (?,?,?,?,?,?)',[fventa,fdespacho,estatus,total,carrito,idusuario ]).then(res=>{
      this.buscarVenta();
    }).catch(e=>{
      this.presentAlert("error al insertar Venta" + e);
    })
  }
  agregarDetalle(cantidad: any, detalle: any, idventa: any, idproducto: any){ 
    console.log("cantidad: "+cantidad);
    console.log("detalle: "+detalle);
    console.log("idproducto: "+idproducto);
    console.log("idventa: "+idventa);
  
    return this.database.executeSql("INSERT INTO detalle(cantidad, detalle, idproducto, idventa) VALUES(?, ?, ?, ?)",[cantidad, detalle,idproducto,idventa]).then(res=> {
      this.buscarDetalle(); 
    }).catch(e=>{
      this.presentAlert("error al insertar detalle" + e);
    })
  }
  agregarDetalleCompra(nombre: any, foto: any, cantidad: any, subtotal: any, venta: any) {  
    // Ejecutar la sentencia SQL para agregar el detalle de compra
      return this.database.executeSql("INSERT INTO detallecomprado(nombreprodc, fotoprodc, cantidadc, subtotalc, ventac) VALUES (?, ?, ?, ?, ?)", [nombre, foto, cantidad, subtotal, venta]).then(res => {
        console.log('Registro insertado con éxito.');
        this.buscarDetallesCompra(); // Actualizar la lista de detalles de compra
      });
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

      await this.database.executeSql(this.venta,[]); 

      await this.database.executeSql(this.detalle,[]);

      await this.database.executeSql(this.detalleComprado,[]);





     
      
     


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

      this.flag.next(true);


  


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
