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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { AddAnimalComponent } from './main/add-animal/add-animal.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
// import { SearchPipe } from './shared/pipes/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AddUserComponent,
    AddAnimalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    CommonModule,
    MainModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
