import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'childborn',
    loadChildren: './big-novena/big-novena.module#BigNovenaModule',
  },
  { path: 'index', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
