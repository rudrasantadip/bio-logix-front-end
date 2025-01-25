import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AllStudentComponent } from './all-student/all-student.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { PopupComponent } from './popup/popup.component';

const config: SocketIoConfig = {
  url: 'http://192.168.58.102:8081', // URL of your Socket.IO server (Spring Boot with Netty)
  options: {
    transports: ['websocket'], // Use WebSocket as the transport method
  }
};

@NgModule({
  declarations: [
    DashboardComponent,
    AllStudentComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ]
})
export class HomeModule { }
