import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AnimalComponent } from './animal/animal.component';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './main.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    MainComponent,
    ListComponent,
    AnimalComponent]
})
export class MainModule { }
