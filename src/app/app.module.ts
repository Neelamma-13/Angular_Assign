import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AgGridModule } from 'ag-grid-angular';
import { UserAddComponent } from './user/useradd/useradd.component';
import { NavComponent } from './nav/nav.component';
import {  HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading/loading-spinner.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { AppRouting } from './app-routing.module';
import {DialogModule} from 'primeng/dialog';
import{ButtonModule} from 'primeng/button';
import{ TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    RoleComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    UserAddComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRouting,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
