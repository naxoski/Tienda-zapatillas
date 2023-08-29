import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Producto2Page } from './producto2.page';

const routes: Routes = [
  {
    path: '',
    component: Producto2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Producto2PageRoutingModule {}
