import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../user.model';
import { UserAddService } from './useradd.service';
import { ImageService } from './image.service';
import { ImageModel } from "./image.model";
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UserAddComponent implements OnInit {
  user: user;
  @Input() imagemodel: ImageModel;
  countryList = [];
  stateList = [];
  url: any;
  msg = "";
  selectedCountry = '';
  selectedState = '';
  countries: any;
  states: any;
  imageData: ImageModel;
  imageUrl: string = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  // filetoUpload: File = null;
  image: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private useraddservice: UserAddService,
    private imageservice: ImageService, private http: HttpClient) { }

  handleFileInput($event: Event) {
    // this.filetoUpload = file.item(0);
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }
  convertToBase64(file: File) {
    this.image = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    this.image.subscribe((data) => {
      console.log(data)
      this.imageUrl = data;
      let img = JSON.stringify(data);
      this.imageData.imageData = img;
      this.imageData.extension = file.type;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  onCancel() {
    this.router.navigate(['/user'], { relativeTo: this.route });
  }
  onCountires() {
    this.useraddservice.getCountires().subscribe(
      (data) => {
        this.countries = Object.entries(data);
        // this.countries = JSON.stringify(data);
        Object.values(data).forEach((country) => {
          this.countryList.push((country.name));
        });
      }
    );
  }
  onStates(countryId) {
    this.useraddservice.getStates(countryId).subscribe(
      (data) => {
        this.states = Object.entries(data);
        // this.states = JSON.stringify(data);
        Object.values(data).forEach((state) => {
          this.stateList.push((state.name));
        });
      }
    );
  }

  setCountry() {
    if (this.selectedCountry !== null) {
      this.countries.forEach((country) => {
        if (country[1].name === this.selectedCountry) {
          this.user.country = country[1].id;
        }
      })
    }
  }

  setState() {
    if (this.selectedState !== null) {
      this.states.forEach((state) => {
        if (state[1].name === this.selectedState) {
          this.user.state = state[1].id;
        }
      })
    }
  }
  uploadImage() {
    this.imageservice.saveImage(this.imageData).subscribe((data)=>{ },
    (error)=>{ }, 
    ()=>{}
    );
  }
  SaveUser(user) {
    console.log(user);
    this.user.password = 'userito';
    this.user.roles = [1];
    this.setCountry();
    this.setState();
    this.imageservice
    this.user.dateOfBirth = new Date(this.user.dateOfBirth);
    this.user.modifiedDateTime = new Date(this.user.modifiedDateTime);
    this.user.createdDateTime = new Date(this.user.createdDateTime);
    this.useraddservice.SaveUser(user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/user'], { relativeTo: this.route })
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.uploadImage();
      }
    );

  }

  ngOnInit(): void {
    this.user = {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: null,
      emailId: '',
      mobileNumber: '',
      addressField1: '',
      addressField2: '',
      country: 0,
      state: 0,
      roles: [],
      zipCode: '',
      timeZone: '',
      locale: '',
      imageLocation: '',
      createdSource: '',
      modifiedSource: '',
      createdDateTime: null,
      modifiedDateTime: null
    }
    this.onCountires();
    this.onStates('countryId');
    this.initUserImage();
  }

  initUserImage() {
    this.imageData = {
      userId: 0,
      extension: '',
      imageData: ''
    }
  }
}