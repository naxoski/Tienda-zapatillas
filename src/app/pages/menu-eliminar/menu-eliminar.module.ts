import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEliminarPageRoutingModule } from './menu-eliminar-routing.module';

import { MenuEliminarPage } from './menu-eliminar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEliminarPageRoutingModule
  ],
  declarations: [MenuEliminarPage]
})
export class MenuEliminarPageModule {}
