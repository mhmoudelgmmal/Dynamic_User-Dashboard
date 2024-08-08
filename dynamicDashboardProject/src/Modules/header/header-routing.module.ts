import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/components/header.component';

const routes: Routes = [
  {path:"",
    component:HeaderComponent,
    children:[
      {path:'',loadChildren:() =>
        import("../dashboard/dashboard.module").then((m) => m.DashboardModule),}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
