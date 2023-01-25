import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import party from "party-js";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
 
  logoutDiv:boolean=false
  acno:any=""
user:string=''
confirmMsg:boolean=false
DeleteSpinner:boolean=false
 isCollapse:boolean=true
 currentAcno:Number=0
 balance:Number=0
 depositForm=this.fb.group({
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

 })
 depositMsg:string=''


 constructor (private api:ApiService,private fb:FormBuilder,private router:Router){

 }

ngOnInit(){
  if(!localStorage.getItem("token")){
    this.router.navigateByUrl('')
alert('Please LogIn')
  }
  if(localStorage.getItem("username")){
    this.user=localStorage.getItem("username")||''
  }
 
}

collapse(){
  this.isCollapse=!this.isCollapse
}

getBalance(){
  if(localStorage.getItem("currentAcno")){
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
    this.api.getBalance(this.currentAcno)
    .subscribe(
      (result:any)=>{
console.log(result);
this.balance=result.balance
      }
    )
      }
    
}
// deposit..........
deposit(){
  if(this.depositForm.valid){
    let amount=this.depositForm.value.amount
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
this.api.deposit(this.currentAcno,amount)
.subscribe(
  (result:any)=>{
console.log(result);
this.depositMsg=result.message
setTimeout(()=>{
  this.depositForm.reset()
  this.depositMsg=''
},3000)
  },
  // error
  (result:any)=>{
    this.depositMsg=result.message
  }
)
  }
  else{
    alert('invalid form')
  }
}

showconfetti(source:any){
 
  party.confetti(source);
}
// logout
logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("currentAcno")
  localStorage.removeItem("username")
this.logoutDiv=true

setTimeout(() => {
  this.router.navigateByUrl('')
}, 4000);


}
// delete-confirm
deleteAccountFromNavBar(){
  this.acno=localStorage.getItem("currentAcno")
  this.confirmMsg=true
}

// ...........
onCancel(){
  this.acno=""
  this.confirmMsg=false
}
// ...........
onDelete(event:any){
let deleteACC=JSON.parse(event)
this.api.deleteAccount(deleteACC)
.subscribe(
  (result:any)=>{
    this.acno=""
    localStorage.removeItem("token")
  localStorage.removeItem("currentAcno")
  localStorage.removeItem("username")
  this.DeleteSpinner=true

  setTimeout(() => {
    this.router.navigateByUrl('')
    this.DeleteSpinner=false
  }, 4000);
  },
  (result:any)=>{
    alert(result.error.message)
  }
)
}
}






