import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Alert } from '../alert'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alerts: Alert[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form) {
    console.log(form.value);
    this.authService.signIn(form.value).subscribe((res) => {
      console.log('login user:', res)
      console.log("Logged in!");
       this.router.navigateByUrl('home');   

    }, err => {
      console.log('error: ',err.error)
      alert(err.error)
    });
  }
 


}
