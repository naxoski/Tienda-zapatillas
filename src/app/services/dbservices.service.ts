import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform,AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, firstValueFrom, from, of, throwError } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Firestore, collection, writeBatch, query, where, getDocs } from '@angular/fire/firestore';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { QuerySnapshot, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';


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
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
 
  

  //TABLAS
  rol: string= "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY autoincrement,nombrerol VARCHAR(30) NOT NULL);";
  pregunta: string= "CREATE TABLE IF NOT EXISTS pregunta(idpregunta INTEGER PRIMARY KEY autoincrement, nombrepregunta VARCHAR(30) NOT NULL);";
  categoria: string= "CREATE TABLE IF NOT EXISTS  categoria(idcategoria INTEGER PRIMARY KEY autoincrement, nombrecategoria VARCHAR(30) NOT NULL);";
  producto: string= "CREATE TABLE IF NOT EXISTS  producto(idproducto INTEGER PRIMARY KEY autoincrement, nombreproducto VARCHAR(30) NOT NULL, descripcion VARCHAR(30) NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL, foto BLOB NOT NULL,idcategoria INTEGER NOT NULL,  FOREIGN KEY(idcategoria) REFERENCES categoria(idcategoria) );";
  usuario: string="CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY autoincrement, rut VARCHAR(20) NOT NULL, nombreusuario VARCHAR(30) NOT NULL, apellidousuario VARCHAR(30) NOT NULL, fnacimiento DATE, telefono INTEGER , fotoperfil BLOB, correo VARCHAR(30) NOT NULL, clave VARCHAR(10) NOT NULL, respuesta VARCHAR(30) NOT NULL, idpregunta INTEGER NOT NULL, idrol INTEGER NOT NULL,FOREIGN KEY(idpregunta) REFERENCES pregunta(idpregunta), FOREIGN KEY(idrol) REFERENCES rol(idrol) );";
  venta: string = "CREATE TABLE IF NOT EXISTS venta(idventa INTEGER PRIMARY KEY autoincrement, fventa DATE, fdespacho DATE, estatus VARCHAR(30) NOT NULL, total INTEGER NOT NULL , carrito VARCHAR(30) NOT NULL, idusuario INTEGER NOT NULL, FOREIGN KEY(idusuario) REFERENCES usuario(idusuario) );";
  detalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY autoincrement, cantidad INTEGER NOT NULL , detalle INTEGER NOT NULL, idproducto INTEGER NOT NULL, idventa INTEGER NOT NULL,FOREIGN KEY (idproducto) REFERENCES producto(idproducto),  FOREIGN KEY(idventa) REFERENCES venta(idventa) );";
  detalleComprado: string ="CREATE TABLE IF NOT EXISTS detallecomprado(iddetallec INTEGER PRIMARY KEY AUTOINCREMENT, nombreprodc TEXT NOT NULL, fotoprodc TEXT NOT NULL, cantidadc INTEGER NOT NULL, subtotalc INTEGER , ventac INTEGER NOT NULL, FOREIGN KEY (ventac) REFERENCES venta(idventa) );";

  

   
   
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


   private listaZapatillas = new BehaviorSubject<Zapatillas[]>([]);
   private listaUsuario = new BehaviorSubject<Usuario[]>([]);
   private listaVenta = new BehaviorSubject<Venta[]>([]);
   private listaDetalle = new BehaviorSubject<Detalle[]>([]);
   private listaDetalleComprado = new BehaviorSubject<Detallecomprado[]>([]);
   private listaDetallesVenta = new BehaviorSubject<Detallesventa[]>([]);
   private isDBReady = new BehaviorSubject<boolean>(false);

   private flag: BehaviorSubject<boolean> = new BehaviorSubject(false);

   
  constructor(private alertController: AlertController,private sqlite : SQLite, private platform : Platform,private firestore: AngularFirestore,private db: AngularFireDatabase) {
    this.usuariosCollection = this.firestore.collection<Usuario>('usuario');
  }



  dbState(){
    return this.isDBReady.asObservable();
  }
  fetchProducto(): Observable<Zapatillas[]> {
    return this.firestore.collection<Zapatillas>('zapatillas').valueChanges();
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

  buscarZapatillas() {
    this.firestore.collection<Zapatillas>('producto').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching zapatillas:', error);
        return [];
      }),
      map((zapatillas) => zapatillas as Zapatillas[])
    ).subscribe((zapatillas) => {
      this.listaZapatillas.next(zapatillas);
    });
  }
  buscarUsuarios() {
    this.firestore.collection<Usuario>('usuario').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching usuarios:', error);
        return [];
      }),
      map((usuarios) => usuarios as Usuario[])
    ).subscribe((usuarios) => {
      this.listaUsuario.next(usuarios);
    });
  }

  buscarUsuariosPorid(id: string): Promise<Usuario[]> {
    return this.firestore.collection('usuario', ref => ref.where('id', '==', id))
      .get()
      .toPromise() // Convierte Observable a Promise
      .then(querySnapshot => {
        // Verifica si querySnapshot es undefined
        if (!querySnapshot) {
          throw new Error('No se encontraron resultados.');
        }
  
        const usuarios: Usuario[] = [];
        querySnapshot.forEach(doc => {
          usuarios.push(doc.data() as Usuario);
        });
        return usuarios;
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
        throw error;
      });
  }
  buscarDetalle() {
    this.firestore.collection<Detalle>('detalle').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching detalles:', error);
        return of([]);
      })
    ).subscribe((detalles) => {
      this.listaDetalle.next(detalles);
    });
  }

  buscarVenta() {
    this.firestore.collection<Venta>('venta').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching ventas:', error);
        return of([]);
      })
    ).subscribe((ventas) => {
      this.listaVenta.next(ventas);
    });
  }
  
  buscarVentas(idventa: string) {
    this.firestore.collection<Venta>('venta', ref => ref.where('idventa', '==', idventa)).valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching venta by ID:', error);
        return of([]);
      })
    ).subscribe((ventas) => {
      this.listaVenta.next(ventas);
    });
  }
  buscarProducto(idproducto: string) {
    this.firestore.collection<Zapatillas>('producto', ref => ref.where('idproducto', '==', idproducto)).valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching producto by ID:', error);
        return of([]);
      })
    ).subscribe((productos) => {
      this.listaZapatillas.next(productos);
    });
  }
  buscarVentaCarrito(usuario: string, estado: string): Observable<Venta[]> {
    return this.firestore.collection<Venta>('venta', ref => ref.where('idusuario', '==', usuario).where('estatus', '==', estado)).valueChanges();
  }

  buscarCompras(estado: string): Observable<Venta[]> {
    return this.firestore.collection<Venta>('venta', ref => ref.where('estatus', '==', estado)).valueChanges();
  }

  buscarDetalles(iddetalle: string) {
    this.firestore.collection<Detalle>('detalle', ref => ref.where('iddetalle', '==', iddetalle)).valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching detalles by ID:', error);
        return of([]);
      })
    ).subscribe((detalles) => {
      this.listaDetalle.next(detalles);
    });
  }
  buscarDetalleProd(prod: string, venta: string): Observable<Detalle[]> {
    return this.firestore.collection<Detalle>('detalle', ref => ref.where('idproducto', '==', prod).where('idventa', '==', venta)).valueChanges();
  }
  buscarDetallesVenta(venta: string): Observable<Detallesventa[]> {
    return this.firestore.collectionGroup<Detallesventa>('detalle', ref => ref.where('idventa', '==', venta)).valueChanges();
  }
  
  buscarDetallesVentaPorD(id: string): Observable<Detallesventa[]> {
    return this.firestore.collectionGroup<Detallesventa>('detalle', ref => ref.where('iddetalle', '==', id)).valueChanges();
  }
  buscarDetallesCompra() {
    this.firestore.collection<Detallecomprado>('detallecomprado').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching detalles de compra:', error);
        return of([]);
      })
    ).subscribe((detallesComprados) => {
      this.listaDetalleComprado.next(detallesComprados);
    });
  }
  insertarDetalleCompra(idproducto: string, nombreproducto: string, foto: string, cantidad: number, subtotal: number, idventa: string): Promise<void> {
    return this.firestore.collection('detallecomprado').add({
      idproducto,
      nombreproducto,
      foto,
      cantidad,
      subtotal,
      idventa
    }).then(() => {
      console.log('Detalle de compra agregado exitosamente');
    }).catch((error) => {
      console.error('Error al agregar detalle de compra:', error);
    });
  }
  insertarVenta(fechaActual: Date, fechaDespacho: Date, estado: string, total: number, tipo: string, idUser: string): Promise<void> {
    const venta = {
      fechaActual: fechaActual,
      fechaDespacho: fechaDespacho,
      estado: estado,
      total: total,
      tipo: tipo,
      idUser: idUser
    };

    // Inserta una nueva venta en la colección 'ventas'
    return this.firestore.collection('ventas').add(venta).then(() => {
      console.log('Venta agregada exitosamente');
    }).catch((error) => {
      console.error('Error al agregar venta:', error);
    });
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
  restarStock(id: string, stock: number) {
    const productoRef = this.firestore.collection('producto').doc(id);
    return productoRef.update({ stock }).then(() => {
      this.buscarZapatillas();
    }).catch((error) => {
      console.error('Error updating stock:', error);
    });
  }
  CambiarContra(clave: string, pregunta: string, respuesta: string, correo: string) {
    this.firestore.collection('usuario', ref => ref.where('correo', '==', correo).where('respuesta', '==', respuesta).where('idpregunta', '==', pregunta))
      .get().pipe(
        catchError((error) => {
          console.error('Error changing password:', error);
          return of([]);
        })
      ).subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ clave }).then(() => {
            this.buscarUsuarios();
          }).catch((error) => {
            console.error('Error updating password:', error);
          });
        });
      });
  }
   //Venta/carrito
   modificarEstadoVenta(id: string, estado: string) {
    const ventaRef = this.firestore.collection('venta').doc(id);
    return ventaRef.update({ estatus: estado }).then(() => {
      this.buscarVenta();
    }).catch((error) => {
      console.error('Error updating venta status:', error);
    });
  }
  modificarFechaEntrega(id: string, fecha: string) {
    const ventaRef = this.firestore.collection('venta').doc(id);
    return ventaRef.update({ fdespacho: fecha }).then(() => {
      this.buscarVenta();
    }).catch((error) => {
      console.error('Error updating delivery date:', error);
    });
  }
  modificarEntrega(id: string, entrega: string) {
    return this.modificarFechaEntrega(id, entrega); // Same implementation as modificarFechaEntrega
  }
  modificarTotal(id: string, total: number) {
    const ventaRef = this.firestore.collection('venta').doc(id);
    return ventaRef.update({ total }).then(() => {
      this.buscarVenta();
    }).catch((error) => {
      console.error('Error updating total:', error);
    });
  }
  modificarDetalle(id: string, detalle: string, cantidad: number) {
    const detalleRef = this.firestore.collection('detalle').doc(id);
    return detalleRef.update({ detalle, cantidad }).then(() => {
      this.buscarDetalle();
    }).catch((error) => {
      console.error('Error updating detalle:', error);
    });
  }
  modificarVentaCarrito(estatus: string, id: string) {
    return this.modificarEstadoVenta(id, estatus); // Same implementation as modificarEstadoVenta
  }
  modificarUsuario(idusuario: string, rut: string, nombreusuario: string, apellidousuario: string, telefono: string, fotoperfil: string, correo: string) {
    const usuarioRef = this.firestore.collection('usuario').doc(idusuario);
    return usuarioRef.update({ rut, nombreusuario, apellidousuario, telefono, fotoperfil, correo }).then(() => {
      this.buscarUsuarios();
    }).catch((error) => {
      console.error('Error updating usuario:', error);
    });
  }
  modificarProducto(idproducto: string, nombreproducto: string, descripcion: string, precio: number, stock: number): Promise<void> {
    return this.firestore.collection('productos').doc(idproducto).update({
      nombreproducto,
      descripcion,
      precio,
      stock
    }).then(() => {
      console.log('Producto modificado exitosamente');
    }).catch((error) => {
      console.error('Error al modificar producto:', error);
    });
  }
  modificarPerfil(idusuario: string, nombreusuario: string, apellidousuario: string, fnacimiento: string, telefono: string, fotoperfil: string, correo: string) {
    const usuarioRef = this.firestore.collection('usuario').doc(idusuario);
    return usuarioRef.update({
      nombreusuario,
      apellidousuario,
      fnacimiento,
      telefono,
      fotoperfil,
      correo
    }).then(() => {
      console.log('Perfil actualizado exitosamente');
      this.buscarUsuarios();
    }).catch((error) => {
      console.error('Error actualizando perfil:', error);
    });
  }
  insertarDetalleComprado(nombreproducto: string, fotoproducto: string, cantidad: number, subtotal: number, idventa: number) {
    return this.firestore.collection('detallecomprado').add({
      nombreprodc: nombreproducto,
      fotoprodc: fotoproducto,
      cantidadc: cantidad,
      subtotalc: subtotal,
      ventac: idventa
    }).then(() => {
      console.log('Detalle comprado agregado exitosamente');
    }).catch((error) => {
      console.error('Error agregando detalle comprado:', error);
    });
  }
  eliminarDetallesVenta(idVenta: string) {
    // Referencia a la colección
    const detallesRef = this.firestore.collection('detalle', ref => ref.where('idventa', '==', idVenta));
  
    // Obtener documentos
    return detallesRef.get().toPromise().then(querySnapshot => {
      // Verificar si querySnapshot está definido
      if (!querySnapshot || querySnapshot.empty) {
        console.log('No se encontraron detalles para eliminar');
        return; // Salir si no hay documentos
      }
  
      // Iterar sobre cada documento
      const deletePromises = querySnapshot.docs.map(doc => {
        // Eliminar cada documento individualmente
        return this.firestore.collection('detalle').doc(doc.id).delete();
      });
  
      // Esperar que todas las eliminaciones se completen
      return Promise.all(deletePromises);
    }).then(() => {
      console.log('Detalles eliminados exitosamente');
    }).catch((error) => {
      console.error('Error eliminando detalles:', error);
    });
  }



  buscarUsu(correo: string | undefined, clave: string | undefined): Observable<Usuario | null> {
    if (!correo || !clave) {
      return new Observable<Usuario | null>(observer => {
        observer.next(null);
        observer.complete();
      });
    }
    return new Observable<Usuario | null>(observer => {
      this.usuariosCollection.ref
        .where('correo', '==', correo)
        .where('clave', '==', clave)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            observer.next(null);
          } else {
            observer.next(querySnapshot.docs[0].data() as Usuario);
          }
          observer.complete();
        })
        .catch(error => {
          console.error('Error al ejecutar la consulta: ', error);
          observer.error('Error al ejecutar la consulta: ' + error.message);
        });
    });
  }
  

  buscarCorreo(correo: string): Observable<any> {
    return this.firestore.collection('usuario', ref => ref.where('correo', '==', correo))
      .get()
      .pipe(
        map(querySnapshot => {
          if (querySnapshot.empty) {
            return null; // No se encontraron usuarios
          }
          return querySnapshot.docs[0].data(); // Retorna los datos del primer documento encontrado
        })
      );
  }
  buscarCorreoYPregunta(correo: string, pregunta: string, respuesta: string): Observable<Usuario | null> {
    return this.firestore.collection<Usuario>('usuario', ref => 
      ref.where('correo', '==', correo)
         .where('idpregunta', '==', pregunta)
         .where('respuesta', '==', respuesta)
    ).get().pipe(
      map(querySnapshot => {
        if (querySnapshot.empty) {
          return null; // No se encontraron usuarios
        }
        const usuario = new Usuario();
        localStorage.setItem('correo', usuario.correo);
        localStorage.setItem('idpregunta', usuario.idpregunta);
        localStorage.setItem('respuesta', usuario.respuesta);
        return usuario;
      })
    );
  }

  obtenerProducto(idproducto: string): Observable<any> {
    return this.firestore.collection('producto').doc(idproducto).get().pipe(
      map(doc => {
        if (!doc.exists) {
          return null;
        }
        return doc.data();
      }),
      catchError(error => {
        console.error('Error al obtener el producto:', error);
        return of(null); // En caso de error, retorna null
      })
    );
  }
  ObtenerCategoria(idcategoria: string): Observable<any> {
    return this.firestore.collection('producto', ref => ref.where('idcategoria', '==', idcategoria)).get().pipe(
      map(querySnapshot => {
        if (querySnapshot.empty) {
          return null;
        }
        // Devuelve el primer documento encontrado
        return querySnapshot.docs[0].data();
      }),
      catchError(error => {
        console.error('Error al obtener la categoría:', error);
        return of(null); // En caso de error, retorna null
      })
    );
  }

 obtenerUsuario(idusuario: string): Observable<any> {
  return this.firestore.collection('usuario').doc(idusuario).get().pipe(
    map(doc => {
      if (!doc.exists) {
        return null;
      }
      return doc.data();
    }),
    catchError(error => {
      console.error('Error al obtener el usuario:', error);
      return of(null); // En caso de error, retorna null
    })
  );
}
buscarHistorialCompras(idUsuario: string): Observable<Detallecomprado[]> {
  return this.firestore.collection('detallecomprado', ref => ref.where('idusuario', '==', idUsuario)).get().pipe(
    map(querySnapshot => {
      let items: Detallecomprado[] = [];
      querySnapshot.forEach(doc => {
        items.push(doc.data() as Detallecomprado);
      });
      return items;
    }),
    catchError(error => {
      console.error('Error al obtener historial de compras:', error);
      return of([]); // Retorna un array vacío en caso de error
    })
  );
}
  

 



  




insertarZapatilla(nombreproducto: string, descripcion: string, precio: number, stock: number, foto: string, categoria: string) {
  return this.firestore.collection('zapatillas').add({
    nombreproducto,
    descripcion,
    precio,
    stock,
    foto,
    categoria
  })
  .then(() => {
    console.log('Zapatilla agregada exitosamente');
  })
  .catch((error) => {
    console.error('Error al agregar zapatilla:', error);
  });
}

  cambiarcontra(){

  }

  async obtenerHistorial(idusuario :any): Promise<any>{
    return new Promise((resolve, reject)=>{
      this.database.executeSql('SELECT * FROM venta WHERE idusuario = ?', [idusuario]).then((res)=>{
        if (res.rows.length > 0){
          resolve(res.rows.item(0));
        }else{
          resolve(null);
        }
      }).catch((error)=>{
        reject('Error al obtener el venta' + JSON.stringify(error));
      });
    });

   }


   agregarDetalle(cantidad: number, detalle: string, idventa: string, idproducto: string) {
    return this.firestore.collection('detalle').add({
      cantidad,
      detalle,
      idproducto,
      idventa
    }).then(() => {
      console.log('Detalle agregado exitosamente');
      this.buscarDetalle();
    }).catch((error) => {
      console.error('Error agregando detalle:', error);
    });
  }
  agregarDetalleCompra(nombre: string, foto: string, cantidad: number, subtotal: number, venta: number) {
    return this.insertarDetalleComprado(nombre, foto, cantidad, subtotal, venta); // Reutilizar método ya definido
  }
  actualizarProducto(idproducto: string, nombreproducto: string, descripcion: string, precio: number, stock: number, foto: string, categoria: string) {
    const productoRef = this.firestore.collection('producto').doc(idproducto);
    return productoRef.update({
      nombreproducto,
      descripcion,
      precio,
      stock,
      foto,
      categoria
    }).then(() => {
      console.log('Producto actualizado exitosamente');
      this.buscarZapatillas();
    }).catch((error) => {
      console.error('Error actualizando producto:', error);
    });
  }
  eliminarProducto(idproducto: string) {
    this.firestore.collection('zapatillas').doc(idproducto).delete().then(() => {
      console.log('Producto eliminado');
    }).catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
  }
  eliminarUsuario(idusuario: string) {
    const usuarioRef = this.firestore.collection('usuario').doc(idusuario);
    return usuarioRef.delete().then(() => {
      console.log('Usuario eliminado exitosamente');
      this.buscarUsuarios();
    }).catch((error) => {
      console.error('Error eliminando usuario:', error);
    });
  }

  insertarUsuario(
    rut: string,
    nombre: string,
    apellido: string,
    fechaNacimiento: string,
    telefono: string,
    foto: string,
    correo: string,
    clave: string,
    respuesta: string,
    pregunta: string,
    rol: string
  ): Promise<void> {
    return this.firestore.collection('usuario').add({
      rut,
      nombre,
      apellido,
      fechaNacimiento,
      telefono,
      foto,
      correo,
      clave,
      respuesta,
      pregunta,
      rol
    })
    .then(() => {
      console.log('Usuario agregado exitosamente');
    })
    .catch((error) => {
      console.error('Error al agregar usuario:', error);
    });
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

  exportDataToJson(): Promise<any> {
    const tables = [
      'rol',
      'pregunta',
      'categoria',
      'producto',
      'usuario',
      'venta',
      'detalle',
      'detallecomprado'
    ];
    
    const data: any = {};
  
    const fetchCollection = (collection: string) => {
      return firstValueFrom(this.firestore.collection(collection).get()).then(querySnapshot => {
        data[collection] = querySnapshot.docs.map(doc => doc.data());
      });
    };
  
    return Promise.all(tables.map(fetchCollection)).then(() => {
      return data;
    }).catch((error) => {
      return Promise.reject('Error exportando datos a JSON: ' + error.message);
    });
  }


}
