import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule,AngularFireDatabaseModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },SQLite],
  bootstrap: [AppComponent],
  
  
})

export class AppModule {}
