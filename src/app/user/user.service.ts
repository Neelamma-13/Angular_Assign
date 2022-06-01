import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface userlists {

  userName: string;
  firstName: string;
  lastName: string;
  createdDateTime: Date;
  status: string;

}

@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient, private router: Router) { }
  validateUsernameNotTaken(control: AbstractControl) {
    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { userName: true };
      })
    );
  }

  checkUsernameNotTaken(userName): Observable<any> {

    let requestparam = new HttpParams().set('userName', userName);


    return this.http.get("http://localhost:8080/user/exist", { params: requestparam });
  }
  cancel() {
    this.router.navigate(['/home'])
  }
  add() {
    this.router.navigate(['/useradd'])
  }
  getUserList() {
    return this.http.get("http://localhost:8080/user/users")
  }
  deleteuser(userId){
    let params=new HttpParams().set('id',userId);

    return this.http.delete('http://localhost:8080/user/delete',{params:params});


  }
}