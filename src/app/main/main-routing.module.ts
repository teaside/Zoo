import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { AuthGuardGuard } from '../auth-guard.guard';
import { AuthComponent } from '../auth/auth.component';
import { MainComponent } from './main.component';
import { ListComponent } from './list/list.component';
import { AnimalComponent } from './animal/animal.component';

const routes: Routes = [
  // { path: '', redirectTo: '/system', pathMatch: 'full' },
  { path: 'system', component: MainComponent, children: 
  [
    
    { path: 'list', component: ListComponent, canActivate: [AuthGuardGuard]},
    { path: 'addAnimal', component: AddAnimalComponent, canActivate: [AuthGuardGuard]},
    
    { path: 'animal/:id', component: AnimalComponent, canActivate: [AuthGuardGuard]},
    { path: '**', redirectTo: 'system' }
    // { path: '', redirectTo: '/list', pathMatch: 'full' }
    
  ]}
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
