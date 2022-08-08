import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '../directives/must-match.validator';
import { User } from '../models/user';
import { AuthGuard } from '../services/auth-guard.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.css']
})
export class AdminUserUpdateComponent implements OnInit {

  id: any;
  editUser: User = new User();
  editUserForm: FormGroup;

  constructor(private _formBuilder:FormBuilder, private _route:ActivatedRoute, private _userService: UserService,
    private _router:Router, private _authGuard:AuthGuard) { }

  ngOnInit(): void {
    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }

    this.id = this._route.snapshot.paramMap.get('id');
    console.log(this._route.snapshot)
    console.log("ID: " + this.id);

    this._userService.getUserById(this.id).subscribe(result=>{
      this.editUser = result;
      console.log(this.editUser);
    }, error=>{
      console.log(error);
    })

    this.editUserForm = this._formBuilder.group({
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
    return this.editUserForm.controls;
  }

  updateUser(){
    this._userService.updateUser(this.id, this.editUser).subscribe(result=>{
      console.log(result)
      this._router.navigate(['/admin/users']);
    }, error=>{
      console.log(error)
    })
  }
}
