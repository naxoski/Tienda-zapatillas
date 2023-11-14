import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidacionCorreoPage } from './validacion-correo.page';

const routes: Routes = [
  {
    path: '',
    component: ValidacionCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidacionCorreoPageRoutingModule {}
