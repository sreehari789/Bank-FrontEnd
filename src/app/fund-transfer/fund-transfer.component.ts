import { Component ,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  fundTransferSuccessMsg: string = ''
  fundTransferErrorMsg: string = ''

  constructor (private api:ApiService,private fb:FormBuilder){

  }
  user:string=''


  ngOnInit(){
    if(localStorage.getItem("username")){
      this.user=localStorage.getItem("username")||''
    }
   
  }

  fundTransferForm = this.fb.group({
    toAcno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })
  
  transfer() {
    if (this.fundTransferForm.valid) {
      let toAcno = this.fundTransferForm.value.toAcno
      let pswd = this.fundTransferForm.value.pswd
      let amount = this.fundTransferForm.value.amount
      // make api call for fund transfer
      this.api.fundTransfer(toAcno, pswd, amount)
        .subscribe(
          // success
          (result: any) => {
            this.fundTransferSuccessMsg = result.message
          },
          // clientError
          (result:any)=>{
            this.fundTransferErrorMsg=result.error.message
            setTimeout(() => {
              this.fundTransferErrorMsg=""
            },3000);
          }

        )
    }
    else {
      alert("Invalid form")
    }
  }
// clerfundTransfer
  clearfundTransfer(){
    this.fundTransferErrorMsg=""
    this.fundTransferSuccessMsg=""
    this.fundTransferForm.reset()
  }

}
