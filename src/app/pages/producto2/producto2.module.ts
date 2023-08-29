import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Producto2PageRoutingModule } from './producto2-routing.module';

import { Producto2Page } from './producto2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Producto2PageRoutingModule
  ],
  declarations: [Producto2Page]
})
export class Producto2PageModule {}
