import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAdminPageRoutingModule } from './menu-admin-routing.module';

import { MenuAdminPage } from './menu-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAdminPageRoutingModule
  ],
  declarations: [MenuAdminPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuAdminPageModule {}
