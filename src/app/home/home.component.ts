  
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;
  disabletext : boolean = true;
  

  constructor(private router: Router, public service: UserService,private toastr:ToastrService,  private _route : ActivatedRoute) { }

  ngOnInit() {
    const userid = this._route.snapshot.params['id'];
    this.service.getUserProfile(userid).subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
    console.log(this.userDetails);
  }
  Edituser(userid)
  {
    this.service.edit(userid).subscribe(
      (res:any)=>{
        if(res.succeeded){
          
          this.toastr.success('Saved Succesfully');
        }
      },
      (err:any)=>{
        console.log(err);
      });
    
    
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}