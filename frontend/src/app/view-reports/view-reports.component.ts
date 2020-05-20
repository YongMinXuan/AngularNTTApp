import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})
export class ViewReportsComponent implements OnInit {
  showActions: boolean = false
  showHeader: boolean = false
  constructor(private authService: AuthService,private router: Router) { }
  public results
  ngOnInit(): void {
    var adminrights = localStorage.getItem('admin');
    var userid = localStorage.getItem('userid');
    console.log('admin value',adminrights)
    console.log('user id: ',userid)
    if (adminrights == 'true'){
      this.showActions = true
      this.authService.viewReport().subscribe((res)=>{
      console.log('report:',res)
      this.results = JSON.parse(res.ResultsfromSQL)
      console.log('full results from server: ',this.results)
      console.log('full results from server length: ',this.results.length)
      if(this.results.length > 0){
        this.showHeader = true
      }
    });
    }

    else if(adminrights == 'false'){
      console.log('non admin')
      this.authService.viewNonAdminReport().subscribe((res)=>{
        console.log('report:',res)
        this.results = JSON.parse(res.ResultsfromSQL)
        console.log('full results from server: ',this.results)
        console.log('full results from server length: ',this.results.length)
        if(this.results.length > 0){
          this.showHeader = true
        }
      });
    }

    var userid = localStorage.getItem('userid');
    console.log('admin value',adminrights)
    console.log('user id: ',userid)
    
    if(userid == null){
      alert('Your Credentials are not verified. Please Login again!')
      this.router.navigateByUrl('');
    }
    
  }



  Approve(i){

    console.log(i)
      this.authService.approveReport(i).subscribe((res)=>{
      console.log('report:',res)
      
      this.ngOnInit();
    });
  }

  Revoke(i){

    console.log(i)
      this.authService.revokeReport(i).subscribe((res)=>{
      console.log('report:',res)
      
      this.ngOnInit();
    });
  }
  

}
