import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { PetComponent } from './components/pet/pet.component'
import { AddPetComponent } from './components/add-pet/add-pet.component'
import { CreateUserComponent } from './components/create-user/create-user.component'

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pet/:id', component: PetComponent},
  {path: 'pets/new', component: AddPetComponent},
  {path: 'users/new', component: CreateUserComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
