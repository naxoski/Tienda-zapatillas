import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerusuariosPageRoutingModule } from './verusuarios-routing.module';

import { VerusuariosPage } from './verusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerusuariosPageRoutingModule
  ],
  declarations: [VerusuariosPage]
})
export class VerusuariosPageModule {}
