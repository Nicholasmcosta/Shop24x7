import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  user: User = new User();
  userList:any=[];
  success:boolean = false;


  constructor(private _httpClient:HttpClient, private _router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this._httpClient.get('http://localhost:8080/admin/users').subscribe(
      (result)=>{
        this.userList=result;
 
        for(let index=0;index < this.userList.length;index++){
          
          if(this.user.username == this.userList[index].username &&
            this.user.password == this.userList[index].password){
            
              localStorage.setItem('isLoggedIn','true')

              localStorage.setItem('firstName',this.userList[index].firstName)
              localStorage.setItem('lastName',this.userList[index].lastName)
              localStorage.setItem('id',this.userList[index]._id)
              localStorage.setItem('admin',this.userList[index].admin)

              console.log(localStorage.getItem('id'))
              console.log(localStorage.getItem('admin'))

              var stat=localStorage.getItem('admin');
              this.success=true

              window.location.replace('/homepage');
              break;
          }
        }

        if(this.success==false){
          alert('Please Enter Correct Details')
        }
      },
      (error)=>{
        console.log(error)
      },
    )
  }

}
