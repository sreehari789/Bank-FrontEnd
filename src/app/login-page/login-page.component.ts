import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  errorMsg:string=''
  successMsg:boolean=false
  

  // login group
  LoginForm=this.fb.group({
    // array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

constructor(private fb:FormBuilder, private api:ApiService, private router:Router){

}

  Login(){
if(this.LoginForm.valid){
  let acno=this.LoginForm.value.acno
 
  
  let pswd=this.LoginForm.value.pswd

  this.api.Login(acno,pswd).subscribe((result:any)=>{
    this.successMsg=true
// store username in local storage
localStorage.setItem("username",result.username)

// store Currentacno 
localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))

// store Token
localStorage.setItem("token",result.token)

    // alert(result.messege) 
    setTimeout(()=>{
      this.router.navigateByUrl('Dashboard')

    },2000)
  },
  // client error
  (result:any)=>{
   this.errorMsg=result.error.message
   
  }

  
  )
}
else{
  alert('Invalid Form')
}
 
  }
}
