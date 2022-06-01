import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ColDef, GridReadyEvent} from 'ag-grid-community';
import { PrimeNGConfig } from 'primeng/api';
import {  UserService } from './user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  userName: string = '';
  @ViewChild('v') v;

  error: string = '';
  constructor(private primengConfig: PrimeNGConfig,
    private router: Router,
    private fb: FormBuilder,
    private userservice: UserService,
    private http: HttpClient) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.onGridReady(this.usersLists);
  }
  

  first = 0;

    rows = 10;

 public usersLists:any = [];
 

  onGridReady(userlists: GridReadyEvent) {
    
    this.userservice.getUserList().subscribe(
      (data) => {
        console.log(data);
        Object.values(data).forEach(
          (user:any)=> {
            this.usersLists.push({
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              createdDateTime: user.createdDateTime,
              id: user.id
            });
          }
        )        
      },
      (error)=>{

      },
      ()=>{

      }      
    )
  }

  userForm = this.fb.group(
    {
      userName: [
        "",
        [Validators.required, Validators.minLength(5)],
      ]
    }
  );

  onsubmit(userName) {
    this.validateCheck(userName);
  }

 
  validateCheck(userName) {
    this.userservice.checkUsernameNotTaken(userName).subscribe(
      (data) => {
        if (data) {
          alert('UserName already exist');
        } else
          this.router.navigate(['/useradd']);
      },
      (error) => {},
      () => {});
  }

  opens: boolean;
  onClick() {
    this.v.reset();
    this.opens = true;
  }
  onCancel() {
    this.userservice.cancel();
  }
  deleteData(userId){
    this.userservice.deleteuser(userId).subscribe(
      (data)=>{
        Object.keys(data).forEach((userId)=>{
          this.usersLists.pop(userId);
        })
    })
  }
  next() {
      this.first = this.first + this.rows;
  }
  prev() {
      this.first = this.first - this.rows;
  }
  reset() {
      this.first = 0;
  }
  isLastPage(): boolean {
    return this.usersLists ? this.first === (this.usersLists.length - this.rows): true;
  }
  isFirstPage(): boolean {
    return this.usersLists ? this.first === 0 : true;
  }
}

