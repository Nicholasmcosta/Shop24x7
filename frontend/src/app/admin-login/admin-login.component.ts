import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin: Admin = new Admin();
  adminList:any=[];
  success:boolean = false;

  constructor(private _httpClient:HttpClient, private _router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this._httpClient.get('http://localhost:8080/admin/admins').subscribe(
      (result)=>{
        this.adminList=result;

        for(let index=0;index < this.adminList.length;index++){
          if(
            this.admin.email == this.adminList[index].email &&
            this.admin.password == this.adminList[index].password
          ){
            localStorage.setItem('name',this.adminList[index].name)
            localStorage.setItem('email',this.adminList[index].email)
            localStorage.setItem('id',this.adminList[index].password)
            localStorage.setItem('password',this.adminList[index].password)
            console.log(localStorage.getItem('id'))
            localStorage.setItem('isLoggedIn','true')

            this.success=true
            this._router.navigate(['/admin'])
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
