import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import {UserComponent} from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {path:'user',component: UserComponent,
   children:[{path:'registration',component:RegistrationComponent},
   {path:'login',component:LoginComponent}]
  },
  {path:'home/:id',component:HomeComponent,canActivate:[AuthGuard]},
  // {path:'home/:id',component:HomeComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'adminpanel',component:AdminPanelComponent,canActivate:[AuthGuard],data :{permittedRoles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
