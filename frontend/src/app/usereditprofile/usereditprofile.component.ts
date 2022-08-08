import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MustMatch } from '../directives/must-match.validator';

@Component({
  selector: 'app-usereditprofile',
  templateUrl: './usereditprofile.component.html',
  styleUrls: ['./usereditprofile.component.css']
})
export class UsereditprofileComponent implements OnInit {

  id: any;
  editUser: User = new User();
  editUserForm: FormGroup;

  constructor(private _formBuilder:FormBuilder, private _route:ActivatedRoute, private _userService: UserService,
    private _router:Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    //console.log(this._route.snapshot)
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
      address:['',[Validators.required]],
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
      this._router.navigate(['/profile']);
    }, error=>{
      console.log(error)
    })
  }
}
