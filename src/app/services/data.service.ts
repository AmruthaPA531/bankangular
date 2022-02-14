import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//for creating tokens
const options = {
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})


export class DataService {

currentUserName:any
curAcno:any
 
  users:any={//:any for defining its type
    1000:{acno:1000,uname:"ann",password:"1000",balance:5000,transaction:[]},
    1001:{acno:1001,uname:"anu",password:"1001",balance:5000,transaction:[]},
    1002:{acno:1002,uname:"ram",password:"1002",balance:5000,transaction:[]}
  }

  constructor(private http:HttpClient) {
    // this.getDetails()
   }

   getTransaction(acno:any){
     const data={
       
     }
     return this.http.post('http://localhost:3000/getTransaction/'+acno,data,this.getOptions())
    //  return this.users[this.curAcno].transaction
   }
//to store in local storage
//   saveDetails(){
//     if(this.users){
// localStorage.setItem("db",JSON.stringify(this.users))
//     }
//     if(this.currentUserName){
// localStorage.setItem("cUsername",JSON.stringify(this.currentUserName))
//     }
//     if(this.curAcno){
//       localStorage.setItem("curAcno",JSON.stringify(this.curAcno))
//     }
    
//   }

  //to get values from local storage
//   getDetails(){
//     if(localStorage.getItem("db")){
//           this.users=JSON.parse(localStorage.getItem("db") || '')
//     }
//     if(localStorage.getItem("cUsername") ){
//       this.currentUserName=JSON.parse(localStorage.getItem("cUsername") || '')
// }
// if(localStorage.getItem("curAcno") ){
//   this.curAcno=JSON.parse(localStorage.getItem("curAcno") || '')
// }
   
//   }

  register(acno:any,password:any,uname:any){
    const data={
      acno,
      password,
      uname
    }
    return this.http.post('http://localhost:3000/register',data)
    
    // let db=this.users
    // if(acno in db){
    //   return false
    //   alert("Account already exist")
    // }
    // else{
    // db[acno]={
    // acno,
    // uname,
    // password,
    // balance:0,
    // transaction:[]
    // }
    // console.log(db);
    // this.saveDetails()
    // return true
   
    // }

  }

  login(acno:any,password:any){
    const data={
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',data)
    
  //   let database=this.users
  //   if(acno in database){

  //     if(password==database[acno]["password"]){
  //       this.curAcno=acno
  //     this.currentUserName=database[acno]["uname"]
  //     this.saveDetails()
  //       return true
     
  //     }
  //     else{
  //       alert("incorrect password")
  //       return false
  //     }
  //  }
  //  else{
  //    alert("invalid account number")
  //    return false
  //  }
  }

  deposit(acno:any,password:any,amt:any){

    const data={
      acno,
      password,
      amt
    }
   
    return this.http.post('http://localhost:3000/deposit',data,this.getOptions())
//     var amount=parseInt(amt)
//     let db=this.users
//     if(acno in db){
//       if(password==db[acno]["password"]){
//         db[acno]["balance"]=db[acno]["balance"]+amount
// db[acno].transaction.push({
// amount:amount,
// type:"CREDIT"
// })
//         // this.saveDetails()
       
        
//         return db[acno]["balance"]
//       }
//       else{
//         alert("incorrect password")
//         return false
//       }

//     }
//     else{
//       alert("account does not exist")
//       return false
//     }
  }
  //to add toke into the request header
  getOptions(){
    const token = JSON.parse(localStorage.getItem('token')||'')
    let headers = new HttpHeaders()
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers
    }
    return options
  }

  
  withdraw(acno:any,password:any,amt:any){
    
    const data={
      acno,
      password,
      amt
    }
   
    return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())
    // var amount=parseInt(amt)
    // let db=this.users
    // if(acno in db){
    //   if(password==db[acno]["password"]){
    //     db[acno]["balance"]=db[acno]["balance"]-amount
       
    //     db[acno].transaction.push({
    //     amount:amount,
    //     type:"DEBIT"
    //     })
    //     // this.saveDetails()
    //     return db[acno]["balance"]
    //   }
    //   else{
    //     alert("incorrect password")
    //     return false
    //   }

    // }
    // else{
    //   alert("account does not exist")
    //   return false
    // }
  }
  delete(acno:any){
   
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
  }
}
