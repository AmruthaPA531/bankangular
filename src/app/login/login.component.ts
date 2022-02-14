import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="your perfect banking partner" 

  accno="account number"
  acno=""
  pswd=""
  

loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

 
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  

  //event binding using $event
  login(){
    var acno=this.loginForm.value.acno
    var password=this.loginForm.value.pswd

    if(this.loginForm.valid){
      //asynchronous call
this.ds.login(acno,password)
.subscribe((result:any)=>{
  if(result){
    alert(result.message)
    localStorage.setItem("curAcno",JSON.stringify(result.curAcno))
    localStorage.setItem("currentUserName",JSON.stringify(result.currentUserName))
    localStorage.setItem("token",JSON.stringify(result.token))
  this.router.navigateByUrl('dashboard')
  }
  
  },
  (result)=>{
    alert(result.error.message) 
 
})
                
  //  let result=this.ds.login(acno,password)
  //  if(result){
  //   alert("login successful")
  //   this.router.navigateByUrl('dashboard')
  //  }
    }
    
 else{
   alert("failed")
 }
  }
}
