import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AnimalComponent } from './animal/animal.component';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './main.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { MainRoutingModule } from './main-routing.module';
import { AddAnimalComponent } from './add-animal/add-animal.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    ListComponent,
    AnimalComponent,
    SearchPipe,
    AddAnimalComponent,
    ListComponent,
    AnimalComponent
  ]
})
export class MainModule { }
