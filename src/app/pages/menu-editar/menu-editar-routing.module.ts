import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEditarPage } from './menu-editar.page';

const routes: Routes = [
  {
    path: '',
    component: MenuEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEditarPageRoutingModule {}
