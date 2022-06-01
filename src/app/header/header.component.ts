import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated= false;
  private usersub: Subscription;


  constructor(private loginservice: LoginService, private router:Router) { }

  ngOnInit(): void {
    this.usersub = this.loginservice.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      console.log(!!user);
    })
  }
  
  onLogout(){
    this.loginservice.logout();
  }
  // x = setTimeout(this.link,2000);
  // link(){
  //     this.router.navigate(['/login']);
  // }
  // yy(x){
  //     clearTimeout(x);
  //     x= setTimeout(this.link,2000);
  // }
 
}
