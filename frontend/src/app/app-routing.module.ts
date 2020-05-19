import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import { SubmitReportsComponent } from './submit-reports/submit-reports.component';
import { EditReportsComponent } from './edit-reports/edit-reports.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'view-report', component: ViewReportsComponent },
  { path: 'submit-report', component: SubmitReportsComponent },
  { path: 'edit-report/:id', component: EditReportsComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
