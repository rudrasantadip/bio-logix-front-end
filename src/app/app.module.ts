import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = {
  url: 'http://192.168.58.102:8081', // URL of your Socket.IO server (Spring Boot with Netty)
  options: {
    transports: ['websocket'], // Use WebSocket as the transport method
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
