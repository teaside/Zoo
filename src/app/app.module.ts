import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { MainComponent } from './main/main.component';
import { ListComponent } from './main/list/list.component';
import { AnimalComponent } from './main/animal/animal.component';
import { CommonModule } from '@angular/common';
import { MainModule } from './main/main.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    CommonModule,
    MainModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
