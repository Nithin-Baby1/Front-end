import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import { Observable } from 'rxjs';
import { Iuser } from '../admin-panel/User';
import { Iuserwrapper } from '../admin-panel/UserWrapper';

@Injectable(
  {
  providedIn: 'root'
}
)

export class UserService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  readonly BaseURI= "https://localhost:44339/api"

  formModel=this.fb.group({
    UserName:['',Validators.required],
    Email:['',Validators.email],
    FullName:[''],
    Stream:['',Validators.required],
    RollNo:['',Validators.required],
    Passwords: this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['',Validators.required]
    },{validator: this.comparePasswords})
  });
  formModel1=this.fb.group({
    UserName:['',Validators.required],
    Email:['',Validators.email],
    FullName:[''],
    Stream:['',Validators.required],
    RollNo:['',Validators.required],
  });
  comparePasswords(fb:FormGroup){
    let ConfirmPswrdCntrl= fb.get('ConfirmPassword');
    if(ConfirmPswrdCntrl?.errors == null|| 'passwordMismatch' in ConfirmPswrdCntrl?.errors){
      if(fb.get('Password')!.value != ConfirmPswrdCntrl?.value)
      ConfirmPswrdCntrl?.setErrors({passwordMismatch: true});
      else
      ConfirmPswrdCntrl?.setErrors(null);
      
    }
  }
    register(){
      var body={
        UserName: this.formModel.value.UserName,
        Email: this.formModel.value.Email,
        Stream: this.formModel.value.Stream,
        RollNo: this.formModel.value.RollNo,
        FullName: this.formModel.value.FullName,
        Password: this.formModel.value.Passwords.Password
      };
     return this.http.post(this.BaseURI+'/ApplicationUser/Register',body);
    }
    
    login(formData) {
      return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
    }
    getUserProfile(userid) {
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer'+localStorage.getItem('token')})
      return this.http.get(this.BaseURI + '/UserProfile?id='+userid,{headers: tokenHeader});
    }
    roleMatch(allowedRoles): boolean {
      var isMatch = false;
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
      var userRole = payLoad.role;
      allowedRoles.forEach((element:any) => {
        if (userRole == element) {
          isMatch = true;
          return false;
        }
        return isMatch;
      });
      return isMatch;
    }
    edit(userid){
      var val={
        UserName: this.formModel1.value.UserName,
        Email: this.formModel1.value.Email,
        FullName: this.formModel1.value.FullName,
        Stream : this.formModel1.value.Stream,
        RollNo : this.formModel1.value.RollNo
      }
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer'+localStorage.getItem('token')})
    return this.http.post(this.BaseURI + '/UserProfile/EditUser?id='+userid,val,{headers: tokenHeader});

    }

    getUserList():Observable<Iuserwrapper> {
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer'+localStorage.getItem('token')})
      var users =  this.http.get<Iuserwrapper>(this.BaseURI + '/UserProfile/ForAdmin',{headers: tokenHeader});
      return users;
    }
    deleteUser(userId){
      return this.http.post(this.BaseURI + '/UserProfile/Deleteuser?id='+userId,null);
    }

 
  }

