import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAgregarPage } from './menu-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAgregarPageRoutingModule {}
