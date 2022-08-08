import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable()

export class UserService{
    constructor(private _httpClient:HttpClient){}

    getUsers(): Observable<User[]>{
        return (this._httpClient.get<User[]>('http://localhost:8080/admin/users'))
    }

    addUser(user:any){
        return (this._httpClient.post('http://localhost:8080/admin/users/register',user));
    }

    getUserById(id:any): Observable<User>{
        console.log("ID: " + id);
        return (this._httpClient.get<User>('http://localhost:8080/admin/users/' + id));
    }

    updateUser(id:any, user:User){
        return (this._httpClient.put('http://localhost:8080/admin/users/'+ id, user));
    }

    deleteUser(id:any){
        return (this._httpClient.delete('http://localhost:8080/admin/users/delete/' + id));
    }
}