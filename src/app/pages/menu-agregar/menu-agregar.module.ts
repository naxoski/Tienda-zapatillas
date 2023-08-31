import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAgregarPageRoutingModule } from './menu-agregar-routing.module';

import { MenuAgregarPage } from './menu-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAgregarPageRoutingModule
  ],
  declarations: [MenuAgregarPage]
})
export class MenuAgregarPageModule {}
