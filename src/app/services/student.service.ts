import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../dtos';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl:string='http://192.168.136.102:8080/student';

  constructor(private http:HttpClient) 
  { }

  refreshStudent():Observable<any>
  {
    return this.http.get(`${this.apiUrl}/attendance/refresh`);
  }

  public allStudents():Observable<Student[]>
  {
    return this.http.get<Student[]>(`${this.apiUrl}`);
  }

  public addStudent(student:Student,deviceName:string):Observable<Student>
  {
    let params = new HttpParams()
    .set("deviceName",deviceName);
    return this.http.post<Student>(`${this.apiUrl}/add`,student,{params:params});
  }
}
