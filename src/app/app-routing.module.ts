import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'bar-chart',
    loadChildren: () => import('./bar-chart/bar-chart.module').then( m => m.BarChartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'line-chart',
    loadChildren: () => import('./line-chart/line-chart.module').then( m => m.LineChartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pie-chart',
    loadChildren: () => import('./pie-chart/pie-chart.module').then( m => m.PieChartPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
