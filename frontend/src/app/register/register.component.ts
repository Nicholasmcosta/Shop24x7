import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MustMatch } from '../directives/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser:User = new User();
  confirmPassword: string = "";
  newUserForm: FormGroup;

  constructor(private _formBuilder:FormBuilder, private _userService:UserService) { }


  

  ngOnInit(): void {
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
      console.log(this.newUser.username);
      window.location.replace('/login')
    }, error=>{
      console.log(error);
    })
  }

}
