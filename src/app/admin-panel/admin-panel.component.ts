import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import {Iuser} from './User'
import {Iuserwrapper} from './UserWrapper'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: [
  ]
})
export class AdminPanelComponent implements OnInit {
  userList! : Iuserwrapper;

  constructor(private service: UserService, private router: Router,private toastr:ToastrService) {
    
   }

  ngOnInit() {
   
    this.service.getUserList().subscribe(
      res => {
        this.userList = res;

      },
      err => {
        console.log(err);
      },
    );
    console.log(this.userList);
  }
  AdminEdit(userid)
  {
     this.router.navigateByUrl('/home/'+userid);
  }
  Add()
  {
    this.router.navigateByUrl('/user/registration');

  }
  Dlt(userId)
  {
    console.log("hi")
    this.service.deleteUser(userId).subscribe(
      (res:any)=>{
      if(res.succeeded){
          
        this.toastr.success('User deleted Succesfully');
        this.router.navigateByUrl('/home/');
        
      }

    

  },
  (err:any)=>{
    console.log(err);
  });

  }
}
