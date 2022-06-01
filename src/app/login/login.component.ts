import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';

import {  LoginResponseData, LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  isLoading = false;
  isLoginMode = true;
  error:string=null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const userName = form.value.userName;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<LoginResponseData>;
    authObs= this.loginService.login(userName,password);
      
      authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}