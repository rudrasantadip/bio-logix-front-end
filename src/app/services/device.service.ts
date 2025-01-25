import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  apiUrl:string='http://localhost:8080/device';
  constructor(private http:HttpClient) 
  {

  }

  updateDeviceStatus(deviceId:number, deviceStatus:string):Observable<any>
  {
    let params = new HttpParams()
    .set('deviceId',deviceId)
    .set('deviceStatus',deviceStatus);

    return this.http.get<any>(`${this.apiUrl}/update/status`,{params:params});
  }


}
