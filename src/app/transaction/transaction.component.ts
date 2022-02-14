import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions:any
  acno:""
  constructor(private ds:DataService) {
    this.acno=JSON.parse(localStorage.getItem("curAcno")||'')
    this.ds.getTransaction(this.acno).subscribe((result:any)=>{
      this.transactions=result.transaction
    },
    (result)=>{
      alert(result.error.message)
    }
    )
    // this.transactions=this.ds.getTransaction()
    // console.log(this.transactions);
    
   }

  ngOnInit(): void {
  }

}
