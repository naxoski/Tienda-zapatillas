import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then(m => m.PrincipalPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'recuperar-contra',
    loadChildren: () => import('./pages/recuperar-contra/recuperar-contra.module').then(m => m.RecuperarContraPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./pages/crear-cuenta/crear-cuenta.module').then(m => m.CrearCuentaPageModule)
  },

  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoPageModule)
  },

  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosPageModule)
  },
  
  {
    path: 'menu-admin',
    loadChildren: () => import('./pages/menu-admin/menu-admin.module').then(m => m.MenuAdminPageModule)
  },
  
  {
    path: 'verusuarios',
    loadChildren: () => import('./pages/verusuarios/verusuarios.module').then( m => m.VerusuariosPageModule)
  },
  {
    path: 'ver-productos',
    loadChildren: () => import('./pages/ver-productos/ver-productos.module').then( m => m.VerProductosPageModule)
  },
  {
    path: 'agregar-productos',
    loadChildren: () => import('./pages/agregar-productos/agregar-productos.module').then( m => m.AgregarProductosPageModule)
  },
  {
    path: 'agregar-usuarios',
    loadChildren: () => import('./pages/agregar-usuarios/agregar-usuarios.module').then( m => m.AgregarUsuariosPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./pages/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule)
  },
  
  {
    path: 'modificar-productos',
    loadChildren: () => import('./pages/modificar-productos/modificar-productos.module').then( m => m.ModificarProductosPageModule)
  },

  {
    path: 'historial-compra',
    loadChildren: () => import('./pages/historial-compra/historial-compra.module').then( m => m.HistorialCompraPageModule)
  },
  {
    path: 'validacion-correo',
    loadChildren: () => import('./pages/validacion-correo/validacion-correo.module').then( m => m.ValidacionCorreoPageModule)
  },
  {
    path: 'cambiarcontra',
    loadChildren: () => import('./pages/cambiarcontra/cambiarcontra.module').then( m => m.CambiarcontraPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },

  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },


 
 

 

 

  

 
 









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
