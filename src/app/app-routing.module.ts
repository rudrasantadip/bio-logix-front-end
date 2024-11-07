import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'auth',loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:'',pathMatch:'full',redirectTo:'auth'
  },
  {
    path:'home',loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'profile',component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
