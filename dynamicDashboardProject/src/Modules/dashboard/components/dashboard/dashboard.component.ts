import { Router } from '@angular/router';
import { dashboardData } from './../../interfaces/dashboard';
import { Observable } from 'rxjs';
import { DashboardService } from './../../services/dashboard.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { dashboardList } from '../../interfaces/dashboard';
import { Select, Store } from '@ngxs/store';
import { AllUsersData } from '../../store/actions/dashboard.actions';
import { DashboardState } from '../../store/state/dashboard.state';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  @Select(DashboardState.dashboardDataandPagesData)dashboardDataandPagesData$!:Observable<dashboardList>
  constructor(private store:Store,private Router:Router){}
  ngAfterViewInit(): void {
    this.dashboardDataandPagesData$.subscribe(
      (data:any) => {       
         if (data?.data?.length > 0) {          
          this.dataSource = data
          
          this.paginator.length = data.total
         }
        
      }
    )
  }
  displayedColumns: string[] = ["id","Avatar","Full Name","Email"]
  dataSource!:any 
  isLoading = true
  clickedRows = new Set<dashboardData>();
  isPaginatorChecked:boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator;

 
  ngOnInit(): void {
    

    this.getAllusersData(1)
  }
  getAllusersData(pageNumber:any){
    if (this.isPaginatorChecked) {
      if (pageNumber.previousPageIndex < pageNumber.pageIndex) {
        
        this.store.dispatch(new AllUsersData(pageNumber.pageIndex +1))
      }else{
        this.store.dispatch(new AllUsersData(pageNumber.pageIndex -1))

      }
      
    }else{
      this.isPaginatorChecked = true
      this.store.dispatch(new AllUsersData(pageNumber))
    }
    // this.DashboardService.getAllDataOfUsers(pageNumber).subscribe((response)=>{
    //   console.log(response);
      
    // })
  }
  onRowClick(row:any){
    this.Router.navigate([`/user`],{queryParams:{id:row.id}})
  }
}
