import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/auth/login/login.component';
import { Student } from 'src/app/dtos';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceService } from 'src/app/services/device.service';
import { StudentService } from 'src/app/services/student.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

export enum DeviceStatus
{
  Locked = 'locked',
  Add='add_finger',
  Verify='verify_finger',
  Update='update_finger',
  Delete='delete_finger'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{



  student:Student ={
    studentName:'',
    enrollmentNo:'',
    registrationNo:''
  }

  formData:Student={
    studentName: '',
    enrollmentNo: '',
    registrationNo: '',
    stream:'',
    section:'',
    year:'',
    rollNo:'',
    fingerPrint:0
  }
  
  checkBoxes:boolean[]=[false,false,false,false];
  device:Device={
    deviceID: 0,
    deviceName: '',
    deviceAdmin: '',
    deviceStatus: ''
  }
  private subscription: Subscription | undefined;

  constructor(
    private deviceService:DeviceService,
    private authService:AuthService,
    private studentService:StudentService,
    private webSocketService:WebSocketService,
  ) 
  {
   
  }
 

  ngOnInit(): void 
  {
    const email = localStorage.getItem('email');
    if(email)
    {
      this.authService.userInfo(email)
      .subscribe((response)=>{if(response.device){this.device=response.device;}});}

      this.subscription = this.webSocketService.connect(this.webSocketService.url)
      .subscribe({
        next: (message) => {
          console.log(message);
          this.student=this.sliceString(message);
        },
        error: (err) => console.error('SSE error:', err)
      });

      this.webSocketService.connect(this.webSocketService.url2)
      .subscribe({
        next: (message) => {
          this.formData.fingerPrint=parseInt(message);
          console.log(message);
        },
        error: (err) => console.error('SSE error:', err)
      });    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  activate(id:number,deviceStatus:string)
  {
    for (let i=0;i<this.checkBoxes.length;i++)
    {
      if(i==id && this.checkBoxes[i]==false)
      {
        this.checkBoxes[i]=true;
        this.deviceService.updateDeviceStatus(this.device.deviceID,deviceStatus)
        .subscribe(
          (response)=>{
            console.log(response);
          }
        );
      }
      else{
        this.checkBoxes[i]=false;
      }
    }
  }

  sliceString(data:string):Student
  {
    let arr:string[] = data.split("::");
    let student:Student={
      studentName:arr[0],
      enrollmentNo:arr[1],
      registrationNo:arr[2]
    }
    return student;
  }
  onSubmit() {
    console.log(this.formData);
    console.log(this.device.deviceName);
    this.studentService.addStudent(this.formData,this.device.deviceName).subscribe(
      (response)=>{
        console.log(response);
      }
    );
  }
}


