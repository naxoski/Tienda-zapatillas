import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicSlides } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';

import {MatTabsModule} from '@angular/material/tabs';

import {MatExpansionModule} from '@angular/material/expansion';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    MatTabsModule,
    PrincipalPageRoutingModule,
    MatExpansionModule
    
  ],
  declarations: [PrincipalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega esta línea
})
export class PrincipalPageModule {}
