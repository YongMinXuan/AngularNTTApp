import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
showActions: boolean = false
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    var adminrights = localStorage.getItem('admin');
    var userid = localStorage.getItem('userid');
   
    if (adminrights == 'true'){
      this.showActions = true
    }
    if(userid == null){
      alert('Your Credentials are not verified. Please Login again!')
      this.router.navigateByUrl('');
    }
  }
  

  logout(){
    this.authService.signOut()
  }
}
