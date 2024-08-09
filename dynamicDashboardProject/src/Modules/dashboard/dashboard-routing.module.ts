import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {path:"",component:DashboardComponent,data: { animation: 'openClosePage' }},
  {path:"user",component:UserDetailsComponent,data: { animation: 'openClosePage' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
