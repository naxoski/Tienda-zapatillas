import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEliminarPage } from './menu-eliminar.page';

const routes: Routes = [
  {
    path: '',
    component: MenuEliminarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEliminarPageRoutingModule {}
