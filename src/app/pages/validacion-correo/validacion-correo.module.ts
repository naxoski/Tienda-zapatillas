import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidacionCorreoPageRoutingModule } from './validacion-correo-routing.module';

import { ValidacionCorreoPage } from './validacion-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidacionCorreoPageRoutingModule
  ],
  declarations: [ValidacionCorreoPage]
})
export class ValidacionCorreoPageModule {}
