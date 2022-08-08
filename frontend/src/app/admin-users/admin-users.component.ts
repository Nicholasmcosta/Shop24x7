import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthGuard } from '../services/auth-guard.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  userList: Array<User>;

  constructor(private _userService: UserService, private _authGuard:AuthGuard, private _router:Router) { }

  ngOnInit(): void {

    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }

    this._userService.getUsers().subscribe(result =>{
      this.userList = result;
      console.log(this.userList);
    })

  }



  deleteUser(id:any){
    this._userService.deleteUser(id).subscribe(result=>{
      console.log(result);
      alert('User deleted successfully');
      window.location.reload()
    }, error=>{
      console.log(error);
    })
  }
}
