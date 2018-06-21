import { NgModule } from '@angular/core';

import { RouterModule, Routes, Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './main/list/list.component';
import { AnimalComponent } from './main/animal/animal.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { AddAnimalComponent } from './main/add-animal/add-animal.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'addUser', component: AddUserComponent},
  { path: 'addAnimal', component: AddAnimalComponent, canActivate: [AuthGuardGuard]},
  { path: 'auth', component: AuthComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuardGuard]},
  { path: 'list', component: ListComponent, canActivate: [AuthGuardGuard]},
  { path: 'animal/:id', component: AnimalComponent, canActivate: [AuthGuardGuard]},
  { path: '**', redirectTo: 'main' },
  ];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
