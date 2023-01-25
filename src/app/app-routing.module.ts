import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

// Login  
{
  path:"",component:LoginPageComponent
}  ,
// Register
{
path:"Register",component:RegisterComponent
},
// Dashboard
{
  path:'Dashboard',component:DashboardComponent
},
// FundTransferComponent
{
  path:'fundTransfer',component:FundTransferComponent
},
// MiniStatementComponent
{
  path:'MiniStatement', component:MiniStatementComponent
},
{
  path:'**',component:PageNotFoundComponent
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
