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
    console.log('admin value',adminrights)
    console.log('user id: ',userid)
    if (adminrights == 'true'){
      this.showActions = true
    }
    if(userid == null){
      alert('Your Credentials are not verified. Please Login again!')
      this.router.navigateByUrl('');
    }
  }
  submit(form){
    console.log(form.value);
  

  }

  logout(){
    this.authService.signOut()
  }
}
