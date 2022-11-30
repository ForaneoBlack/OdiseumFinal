import { NgModule } from '@angular/core';

import {LoginComponent} from "./Componentes/login/login.component";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path:'dashboard',loadChildren: () => import('./Componentes/dashboard/dashboard.module').then(x => x.DashboardModule) },
 {path: '**',redirectTo:'login', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
