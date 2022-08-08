import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAdmin:boolean=false;
  loginStatus:boolean = false;
  firstName:string="";

  constructor(private _authGuard:AuthGuard){}

  ngOnInit(): void {

    this.loginStatus = this._authGuard.isLoggedIn();
    this.isAdmin = this._authGuard.isAdmin();
    this.firstName = localStorage.getItem('firstName');

    console.log("logged in: " + this.loginStatus);
    console.log('Admin or normal user:'+ this.isAdmin);
   
   }
   
   title = 'frontend';

   logout(){
     this._authGuard.logout();
     
   }
}
