import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // acno = ""
  // pswd = ""
  // amount = ""

  

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  withdrawForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  user: any
  acno=""
  loginDate:any
  constructor(private ds: DataService, private fb: FormBuilder ,private router:Router) {
    this.loginDate = new Date()
    if (localStorage.getItem("currentUserName")) {
      this.user = JSON.parse(localStorage.getItem("currentUserName") || "")
    }
  }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("please login")
     this.router.navigateByUrl('')
    }
  }
  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {

      //asynchronous call
      this.ds.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }

        },
          (result) => {
            alert(result.error.message)

          })
    }
    //   let result=this.ds.deposit(acno,pswd,amount)
    //   if(result){
    //     alert(amount+ "credited. New balance is : " + result)
    //   }
    //  }
    //  else{
    //    alert("invalid form")
    //  }


  }

  withdraw() {
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount

    if (this.withdrawForm.valid) {
      
      //asynchronous call
      this.ds.withdraw(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }

        },
          (result) => {
            alert(result.error.message)

          })
        }
    //   let result = this.ds.withdraw(acno, pswd, amount)
    //   if (result) {
    //     alert(amount + "debited. New balance is : " + result)
    //   }
    // }
    // else {
    //   alert("invalid form")
    // }


  }

deleteFromParent(){
this.acno=JSON.parse(localStorage.getItem("curAcno")||'')
  }

delete(event:any){
    // alert("message from parent "+event)
    this.ds.delete(event).subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
    (result)=>{
      alert(result.error.message)
    })
  }

  cancel(){
    this.acno=""
  }

  logout(){
    localStorage.removeItem('curAcno')
    localStorage.removeItem('currentUserName')
    localStorage.removeItem('token')
    this.router.navigateByUrl('')
  }

}
