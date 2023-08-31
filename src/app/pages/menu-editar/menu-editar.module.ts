import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEditarPageRoutingModule } from './menu-editar-routing.module';

import { MenuEditarPage } from './menu-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEditarPageRoutingModule
  ],
  declarations: [MenuEditarPage]
})
export class MenuEditarPageModule {}
