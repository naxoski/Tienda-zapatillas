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
    path: 'producto1',
    loadChildren: () => import('./pages/producto1/producto1.module').then(m => m.Producto1PageModule)
  },
  {
    path: 'producto2',
    loadChildren: () => import('./pages/producto2/producto2.module').then(m => m.Producto2PageModule)
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
