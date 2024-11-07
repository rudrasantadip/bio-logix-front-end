import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllStudentComponent } from './all-student/all-student.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'all-student',
    component:AllStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
