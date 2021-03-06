import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {enableProdMode} from '@angular/core';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }
  onSubmit(){
    this.service.register().subscribe(
     (res:any)=>{
       if(res.succeeded){
         this.service.formModel.reset();
         this.toastr.success('New user created','Registration Successful');
       }else{
        
         res.errors.$values.forEach((element:any) => {
           switch (element.code) {
             case 'DuplicateUserName':
               this.toastr.error('Username already taken','Registartion Failed');
               
               break;
           
             default:
              this.toastr.error(element.description,'Registartion Failed');

               break;
           }
           
         });
       }
     },
      (err:any)=>{
        console.log(err);
      });
    
  }


}
