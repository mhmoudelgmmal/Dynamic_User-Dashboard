import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Dashboard } from '../../interfaces/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { AllUsersData } from '../actions/dashboard.actions';
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
        }
    }
})
@Injectable()
export class DashboardState {
    constructor(private Router:Router) {}
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
            takeUntil(this.destroyed$),
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
}