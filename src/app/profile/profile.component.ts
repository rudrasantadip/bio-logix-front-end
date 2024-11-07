import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../auth/login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{

  user: User={
    email: '',
    password: '',
    device:{
      deviceID:0,
      deviceName:'',
      deviceAdmin:'',
      deviceStatus:''
    }
  };
  constructor(private authService:AuthService)
  {

  }

  ngOnInit(): void 
  {
    const email=localStorage.getItem('email');
    
    if(email)
    {
      this.authService.userInfo(email).subscribe(
        (response)=>{
          this.user=response;
          console.log(response);
        }
      );
    }
  }

}
