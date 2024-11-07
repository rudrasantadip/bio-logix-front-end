import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  scanning: boolean = false;
  scanStatus: string = 'Place your finger on the scanner';
  student: { name: string; id: string; department: string } | null = null;

  checkBoxes:boolean[]=[false,false,false];




  activate(id:number)
  {
    for (let i=0;i<this.checkBoxes.length;i++)
    {
      if(i==id)
      {
        this.checkBoxes[i]=true;
      }
      else{
        this.checkBoxes[i]=false;
      }
    }
  }



 
}
