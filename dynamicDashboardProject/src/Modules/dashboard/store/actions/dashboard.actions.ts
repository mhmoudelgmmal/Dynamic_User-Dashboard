export class AllUsersData {
    static readonly type = '[ALL USERS] GET ALL USERS'
    constructor(public payload:number){}

}
export class UserData {
    static readonly type = '[USER DATA] GET USER DATA'
    constructor(public payload:string){}

}
