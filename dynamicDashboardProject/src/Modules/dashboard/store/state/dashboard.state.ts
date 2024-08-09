import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Dashboard } from '../../interfaces/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { AllUsersData, UserData } from '../actions/dashboard.actions';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@State<Dashboard>({
    name: 'dashBoard',
    defaults:{
        dashboardList:{
            data:[],
            per_page:0,
            total:0,
            total_pages:0,
            isLoading:true
        },userData:{
             data:{
                avatar:"",
                email:"",
                first_name:"",
                id:0,
                last_name:""
             },
             isLoading:true
        }
    }
})
@Injectable()
export class DashboardState {
    @Selector()
    static dashboardLoading (state:Dashboard){
        return state.dashboardList.isLoading;
    }
    @Selector()
    static dashboardData (state:Dashboard){
        return state.dashboardList.data;
    }
    @Selector()
    static dashboardDataandPagesData (state:Dashboard){
        return state.dashboardList;
    }
    @Selector()
    static userData (state:Dashboard){
        return state.userData;
    }

    destroyed$ = new Subject<boolean>()
    private dashboardService = inject(DashboardService)

    @Action(AllUsersData)
    getAllUsersData({ patchState }:StateContext<Dashboard>,{payload}:any){
        
        patchState({
            dashboardList: {
                data: [],
                per_page:0,
                total:0,
                total_pages:0,
                isLoading: true
            }
        })
        return this.dashboardService.getAllDataOfUsers(payload).pipe(
            
            tap((res:any) => {
                
                patchState({
                    dashboardList: {
                        data: res.data,
                        per_page:res.per_page,
                        total:res.total,
                        total_pages:res.total_pages,
                        isLoading: false
                    }
                })
            }
            ),
            catchError((err:HttpErrorResponse) => {
                patchState({
                    dashboardList: {
                        data: [],
                        per_page:0,
                        total:0,
                        total_pages:0,
                        isLoading: false
                    }
                });
                return throwError(() => err)
            })
        )
        
    }
    @Action(UserData)
    getUserData({ patchState }:StateContext<Dashboard>,{payload}:any){
        patchState({
            userData: {
                data: {
                    avatar:"",
                    email:"",
                    first_name:"",
                    id:0,
                    last_name:""
                },                
                isLoading: true
            }
        })
        return this.dashboardService.getUserData(payload).pipe(
            
            tap((res:any) => {
                
                patchState({
                    userData: {
                        data: res.data,                        
                        isLoading: false
                    }
                })
            }
            ),
            catchError((err:HttpErrorResponse) => {
                patchState({
                    userData: {
                        data: {
                            avatar:"",
                            email:"",
                            first_name:"",
                            id:0,
                            last_name:""
                        },
                        
                        isLoading: false
                    }
                });
                return throwError(() => err)
            })
        )
    }
    
}