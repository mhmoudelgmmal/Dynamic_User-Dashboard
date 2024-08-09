import { Component, OnInit } from '@angular/core';
import { DashboardState } from '../../store/state/dashboard.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { dashboardData, dashboardList, userData } from '../../interfaces/dashboard';
import { UserData } from '../../store/actions/dashboard.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Select(DashboardState.userData)userData$!:Observable<dashboardData>
  id:string = ""
  userFetchedData!:userData
  constructor(private store:Store,private router:ActivatedRoute){}
  
  ngOnInit(): void {
     this.router.queryParamMap.subscribe((param:any)=>{
      this.id =param.params['id']
    })
    this.userData$.subscribe((response:any)=>{
      console.log(response);
      this.userFetchedData = response
    })
    this.getUserData()
  }
  getUserData(){
    this.store.dispatch(new UserData(this.id))
  }

}
