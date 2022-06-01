import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../user.model';



@Injectable({ providedIn: 'root' })
export class UserAddService {


    constructor(private http: HttpClient) { }


    SaveUser(user: user) {
        const body = JSON.stringify(user) ;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          });
        return this.http.post('http://localhost:8080/user/register',body,{headers});
    }
    getCountires(){
        return this.http.get('http://localhost:8080/country/getAll');
    }
    getStates(countryId){
        let requestparam = new HttpParams().set('countryId', countryId);

        return this.http.get('http://localhost:8080/state/getAll',{params:requestparam});
    }
    
}
