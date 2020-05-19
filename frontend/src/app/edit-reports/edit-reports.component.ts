import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-reports',
  templateUrl: './edit-reports.component.html',
  styleUrls: ['./edit-reports.component.css']
})
export class EditReportsComponent implements OnInit {
  result_id: string;

  constructor(private actRoute: ActivatedRoute,private authService: AuthService,private router: Router) {
    this.result_id = this.actRoute.snapshot.params.id;
    console.log('id for editing:',this.result_id)
   }

  ngOnInit(): void {
    console.log('id for editing:',this.result_id)
    var userid = localStorage.getItem('userid');
  
    console.log('user id: ',userid)
    
    if(userid == null){
      alert('Your Credentials are not verified. Please Login again!')
      this.router.navigateByUrl('');
    }
  }

  submit(form) {
   
    form.value.id = this.result_id
    console.log('form: ', form.value)
    this.authService.editReport(form.value).subscribe((res)=>{
      console.log('login user:',res)
      console.log("Logged in!");
      
      this.router.navigateByUrl('view-report');
    }); 
  }

}
