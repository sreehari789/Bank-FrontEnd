import { Component } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import {  Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // registor group
  RegisterForm=this.fb.group({
    // array
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){

  }

  registor(){
    if(this.RegisterForm.valid){
     
      let uname=this.RegisterForm.value.uname
      let acno=this.RegisterForm.value.acno
      let pswd=this.RegisterForm.value.pswd
      this.api.registor(uname,acno,pswd).subscribe((result:any)=>{
        alert(result.message) 
        this.router.navigateByUrl('')
      },
      (result:any)=>{
        alert(result.error.message)
      }

      
      )
     
    }
    else{
      alert('Invalid Form')
    }
  }
}
