import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCuentaPageRoutingModule } from './crear-cuenta-routing.module';

import { CrearCuentaPage } from './crear-cuenta.page';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCuentaPageRoutingModule,
    MatRadioModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSlideToggleModule
  ],
  declarations: [CrearCuentaPage]
})
export class CrearCuentaPageModule {}
