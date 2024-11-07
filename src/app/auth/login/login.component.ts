import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface Device{
  deviceID: number,
  deviceName: string,
  deviceAdmin: string,
  deviceStatus: string
}

export interface User{
  userId?:number
  email:string;
  password:string;
  device?:Device
}

export interface ApiResponse{
  message:string;
  status:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{


constructor(private router:Router,private authService:AuthService){}
  user:User={
    email:'',
    password:''
  }

  ngOnInit(): void 
  {
   
  }

    
login() {
  if(this.validatePassword(this.user.password)==false)
  {
    alert("Invalid Password")
  }
  else{
    // console.log(this.user);
    this.authService.login(this.user.email,this.user.password)
    .subscribe(
      (response)=>{
        if(response.message=='success')
        {
          localStorage.setItem('email', this.user.email);
          this.router.navigate(['/home']);
        }
        else{
          alert('invalid credentials');
        }
      }
    )
  }
}

  validatePassword(password: string): boolean {
    // Check for length
    if (password.length < 8) {
      return false;
    }
  
    // Regular expressions for the validation rules
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  
    // Validate all conditions
    return (
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasDigit.test(password) &&
      hasSpecialChar.test(password)
    );
  }

}
