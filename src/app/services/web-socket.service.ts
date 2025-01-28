import { map, Observable, Observer, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Injectable, Injector, NgZone } from '@angular/core';


export interface Message {
    source: string;
    content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService 
{
  public url:string='http:/192.168.136.102:8080/api/fingerprint/sse';
  public url2:string='http://192.168.136.102:8080/api/fingerprint/sse2'

  private eventSource: EventSource | null = null;

  constructor(private zone: NgZone) {}

  connect(url:string): Observable<string> {
    return new Observable(observer => {
      this.eventSource = new EventSource(url);

      this.eventSource.onmessage = (event) => {
        // Using NgZone to ensure change detection is triggered in Angular
        this.zone.run(() => observer.next(event.data));
      };

      this.eventSource.onerror = (error) => {
        this.zone.run(() => observer.error(error));
        this.close();
      };

      return () => this.close();
    });
  }

  private close() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
  }

