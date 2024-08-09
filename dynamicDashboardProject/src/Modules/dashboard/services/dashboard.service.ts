import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard, dashboardData } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getAllDataOfUsers(page:number):Observable<dashboardData>{
    return this.http.get<dashboardData>(`https://reqres.in/api/users?page=${page}`)
  }
  getUserData(id:string):Observable<dashboardData>{
    return this.http.get<dashboardData>(`https://reqres.in/api/users/${id}`)

  }
}
