export interface Dashboard {
   dashboardList: dashboardList
   userData:userData
}
export interface dashboardList{
    data:dashboardData[];
    per_page:number;
    total:number;
    total_pages:number;
    isLoading:boolean;
}
export interface dashboardData{
        avatar:string;
        email:string;
        first_name:string;
        id:number;
        last_name:string
}
export interface userData{
    data:dashboardData
    isLoading:boolean;
}