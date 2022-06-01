
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./nav/nav.component";
import { RoleComponent } from "./role/role.component";
import { UserComponent } from "./user/user.component";
import { UserAddComponent } from "./user/useradd/useradd.component";
import { UserAddService } from "./user/useradd/useradd.service";

const appRoutes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    
    {path:'login',component:LoginComponent},

    {path:'home',component:HomeComponent, children:[
     {path:'', component:HeaderComponent,},
    
    ]},
  
    {path:'user',component:UserComponent,
    children:[
      {path:'', component:HeaderComponent,}    
     ]},
  
    {path:'role',component:RoleComponent,children:[
      {path:'', component:HeaderComponent,},
     
     ]},

    {path:'useradd', component:UserAddComponent,children:[
      {path:'', component:HeaderComponent,},
     
     ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting{

}