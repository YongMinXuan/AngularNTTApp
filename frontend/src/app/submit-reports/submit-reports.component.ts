import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-reports',
  templateUrl: './submit-reports.component.html',
  styleUrls: ['./submit-reports.component.css']
})
export class SubmitReportsComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    var userid = localStorage.getItem('userid');
  
    console.log('user id: ',userid)
    
    if(userid == null){
      alert('Your Credentials are not verified. Please Login again!')
      this.router.navigateByUrl('');
    }
  }

  submit(form) {
    
    var userid = localStorage.getItem('userid');

    console.log('user id: ', userid)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log('date: ', date)
    var time = new Date
   
    var currentSecond = time.getSeconds();
    var currentSeconds = ("0" + currentSecond).slice(-2);
    var currentminute = time.getMinutes();
    var currentminutes = ("0" + currentminute).slice(-2);
    console.log('currentseconds:', currentSeconds)
    var d = new Date,
        dformat = [d.getFullYear(), d.getMonth() + 1,
        d.getDate(),
        ].join('-') + ' ' +
            [d.getHours(),
            currentminutes,
           currentSeconds+"" ].join(':');
    console.log('new date',dformat)
    form.value.date = dformat
    form.value.userid = userid
    form.value.approved = "Not Approved"
    console.log(form.value);

    this.authService.submitReport(form.value).subscribe((res)=>{
      console.log('login user:',res)
      console.log("Logged in!");
      
      this.router.navigateByUrl('home');
    });    
  }

}
