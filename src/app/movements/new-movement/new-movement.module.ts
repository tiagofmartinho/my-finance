import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewMovementPage } from './new-movement.page';
import { CategoriesModule } from '../categories/categories.module';


const routes: Routes = [
  {
    path: '',
    component: NewMovementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewMovementPage],

})
export class NewMovementPageModule {}
