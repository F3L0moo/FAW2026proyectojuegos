import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Memoria } from './pages/memoria/memoria';
import { Adivina } from './pages/adivina/adivina';
import { Scores } from './pages/scores/scores';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  { path:'', component: Login },

  { path:'register', component: Register },

  {
    path:'memoria',
    component: Memoria,
    canActivate:[authGuard]
  },

  {
    path:'adivina',
    component: Adivina,
    canActivate:[authGuard]
  },

  {
    path:'scores',
    component: Scores,
    canActivate:[authGuard]
  }

];