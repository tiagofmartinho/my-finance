import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'movements',
    children: [
      {
        path: '',
        loadChildren: './movements/movements.module#MovementsPageModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'new-movement',
        loadChildren: './movements/new-movement/new-movement.module#NewMovementPageModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'edit-movement/:movementId',
        loadChildren: './movements/edit-movement/edit-movement.module#EditMovementPageModule',
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: 'statistics',
    loadChildren: './statistics/statistics.module#StatisticsPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'new-account',
    loadChildren:
      './accounts/new-account/new-account.module#NewAccountPageModule'
  },
  {
    path: 'edit-account/:accountId',
    loadChildren:
      './accounts/edit-account/edit-account.module#EditAccountPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
