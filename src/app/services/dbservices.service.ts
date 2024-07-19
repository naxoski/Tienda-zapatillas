import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, firstValueFrom, from, of, throwError } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';


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
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
 
  


   private listaZapatillas = new BehaviorSubject<Zapatillas[]>([]);
   private listaUsuario = new BehaviorSubject<Usuario[]>([]);
   private listaVenta = new BehaviorSubject<Venta[]>([]);
   private listaDetalle = new BehaviorSubject<Detalle[]>([]);
   private listaDetalleComprado = new BehaviorSubject<Detallecomprado[]>([]);
   private isDBReady = new BehaviorSubject<boolean>(false);


   
  constructor(  private alertController: AlertController,
    private firestore: AngularFirestore,
  )
  {
    this.usuariosCollection = this.firestore.collection<Usuario>('usuario');

    //Categorias
    this.firestore.collection('categoria').add({
      idcategoria: 1,
      nombrecategoria: 'Hombre'
    });
    
    this.firestore.collection('categoria').add({
      idcategoria: 2,
      nombrecategoria: 'Mujer'
    });

    //Roles
    this.firestore.collection('rol').add({
      idrol: 10,
      nombrerol: 'Usuario'
    });
    
    this.firestore.collection('rol').add({
      idrol: 20,
      nombrerol: 'Admin'
    });

    //Preguntas de seguridad
    this.firestore.collection('pregunta').add({
      idpregunta: 30,
      nombrepregunta: '¿Tienes mascotas?'
    });
    
    this.firestore.collection('pregunta').add({
      idpregunta: 40,
      nombrepregunta: '¿Tienes hermanos?'
    });
    
    this.firestore.collection('pregunta').add({
      idpregunta: 50,
      nombrepregunta: '¿Tienes pareja?'
    });


    //Usuario normal
    this.firestore.collection('usuario').add({
      idusuario: 500,
      rut: '21.475.570-k',
      nombreusuario: 'Ignacio',
      apellidousuario: 'Huerta',
      fnacimiento: new Date('2004-01-05'),
      telefono: 123456789,
      fotoperfil: 'assets/chad.webp',
      correo: 'ignaciohuerta8a@gmail.com',
      clave: 'claveprueba123',
      respuesta: 'si',
      idpregunta: 50, /* Pregunta asociada a ¿Tienes pareja? */
      idrol: 'usuario' /* Rol de usuario */
    });
    //Usuario admin
    this.firestore.collection('usuario').add({
      idusuario: 600,
      rut: '21.475.571-k',
      nombreusuario: 'Ignacio',
      apellidousuario: 'Huerta',
      fnacimiento: new Date('2004-01-05'),
      telefono: 123456789,
      fotoperfil: 'assets/chad.webp',
      correo: 'administrador@gmail.com',
      clave: 'claveprueba123',
      respuesta: 'si',
      idpregunta: 50, /* Pregunta asociada a ¿Tienes pareja? */
      idrol: 'admin' /* Rol de admin */
    });

    //Zapatilla de prueba 
    this.firestore.collection('producto').add({
      idproducto: 100,
      nombreproducto: 'Nike Air Jordan 1',
      descripcion: 'Zapatilla clásica de alto rendimiento.',
      precio: 100000,
      stock: 50,
      foto: 'assets/air jordan 1.webp',
      idcategoria: 'hombre' /* Categoría asociada a Hombre */
    });


  }



  dbState(){
    return this.isDBReady.asObservable();
  }
  fetchProducto(): Observable<Zapatillas[]> {
    return this.firestore.collection<Zapatillas>('producto').valueChanges();
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
  
  buscarDetallesCompraVenta(venta: string): Observable<Detallecomprado[]> {
    return new Observable<Detallecomprado[]>(observer => {
      this.firestore.collection<Detallecomprado>('detallecomprado', ref => ref.where('ventac', '==', venta))
        .valueChanges()
        .subscribe(
          (items: Detallecomprado[]) => {
            observer.next(items);
            observer.complete();
          },
          (error: Error) => {
            observer.error(error);
          }
        );
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

 
  obtenerHistorial(idusuario: any): Observable<any> {
    return new Observable<any>(observer => {
      this.firestore.collection('venta', ref => ref.where('idusuario', '==', idusuario))
        .valueChanges()
        .subscribe(
          (items: any[]) => {
            if (items.length > 0) {
              observer.next(items[0]); // Retorna el primer resultado
            } else {
              observer.next(null); // No se encontraron documentos
            }
            observer.complete();
          },
          (error: any) => {
            observer.error('Error al obtener la venta: ' + error.message);
          }
        );
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
