import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../directives/must-match.validator';
import { User } from '../models/user';
import { AuthGuard } from '../services/auth-guard.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  newUser:User = new User();
  confirmPassword: string = "";
  newUserForm: FormGroup;

  constructor(private _formBuilder:FormBuilder, private _userService:UserService,
    private _authGuard:AuthGuard, private _router:Router) { }

  ngOnInit(): void {
    
    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }

    this.newUserForm = this._formBuilder.group({
      firstName:['', [Validators.required, Validators.minLength(3)]],
      lastName:['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      makeAdmin:['']
    }, {validator:MustMatch('password', 'confirmPassword')});
  }

  get f(){
    return this.newUserForm.controls;
  }

  addUser(){
    this._userService.addUser(this.newUser).subscribe(result =>{
      console.log(result)
      alert(result['message'])
      window.location.replace('admin/users')
    }, error=>{
      console.log(error);
    })
  }
}
