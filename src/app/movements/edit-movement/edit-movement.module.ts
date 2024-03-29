import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditMovementPage } from './edit-movement.page';
import { CategoriesModule } from '../categories/categories.module';

const routes: Routes = [
  {
    path: '',
    component: EditMovementPage
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
  declarations: [EditMovementPage],
})
export class EditMovementPageModule {}
