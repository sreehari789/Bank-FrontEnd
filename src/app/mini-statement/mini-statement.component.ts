import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css']
})
export class MiniStatementComponent implements OnInit {
  user:string=''
  allTransactions:any;
  searchKey:string=''
constructor(private api:ApiService){

}

  ngOnInit(): void{
    if(localStorage.getItem("username")){
      this.user=localStorage.getItem("username")||''
    }

   this.api.getAllTransactions()
   .subscribe((result:any)=>{
console.log(result);
this.allTransactions=result.transation

console.log(this.allTransactions);


   })
  }
  // search($event)
  search(event:any){
this.searchKey=event.target.value
  }

  // generate pdf
  generatePdf(){
    var pdf = new jspdf()
    let col=['Type','FromAcno','ToAcno','Amount']
    let row:any=[]
    pdf.setFontSize(15);
    pdf.text('Transaction History', 11, 8);
    pdf.setFontSize(11);
    pdf.setTextColor(99);
    // convert allTransaction table to nested array
    var itemNew =this.allTransactions
    for(let element of itemNew){
      var temp = [element.type,element.fromAcno,element.toAcno,element.amount]
      row.push(temp)
    }
   
    (pdf as any).autoTable(col,row,{startY:10})
    // open pdf in new tab
    pdf.output('dataurlnewwindow')
    pdf.save('table.pdf');
  }
}
