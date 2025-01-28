import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, User } from '../auth/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string=`192.168.136.102:8080/auth`;

  constructor(private http:HttpClient) 
  {
  }

  public register(user:User):Observable<User>
  {
    return this.http.post<User>(this.apiUrl,user);
  }

  public login(email:string,password:string):Observable<ApiResponse>
  {
    let params = new HttpParams()
    .set("email",email)
    .set("password",password)
    return this.http.get<ApiResponse>(`${this.apiUrl}/login`,{params:params});
  }

  public userInfo(email:string):Observable<User>
  {
    let params = new HttpParams()
    .set("email",email);

    return this.http.get<User>(`${this.apiUrl}/info`,{params:params});
  }
}
