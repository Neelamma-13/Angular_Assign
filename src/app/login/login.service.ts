import { HostListener, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject, throwError } from 'rxjs';

import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';

export interface LoginResponseData {
  
  userName: string;
  password: string;
  modifiedSource: Date;
  modifiedDateTime: Date;
  
}

@Injectable({ providedIn: 'root' })
export class LoginService {
   
    user = new BehaviorSubject<LoginResponseData>(null)
    private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    
  }

  login(userName:string, password:string) {
    return this.http
      .post<LoginResponseData>(
        'http://localhost:8080/user/login',
        {
          userName:userName,
          password:password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            // resData.userName,
            // resData.password,
          );
        })
      );
  }
  

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
  }
  
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, 1000);
  }
  

  private handleAuthentication(
    // userName: string,
    // password: string,
  ) {
    
    // const user = new User(userName, password);
    // // this.user.next(user);
    // localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Invalid!!';
    if (!errorRes.error.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    
    switch (errorRes.error.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
