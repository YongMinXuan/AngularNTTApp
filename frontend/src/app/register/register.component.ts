import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { FormGroup, FormControl,Validators,FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  registerForm: FormGroup;
  unamePattern = "^$";  
  constructor(private _location: Location,private authService: AuthService, private router: Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
  }


  register(form) {
    console.log('reg page',form.value);
    this.authService.register(form.value).subscribe((res) => {
      console.log('before home page',res)

     
        console.log('cannot pass')
     

        this.router.navigateByUrl('home');
    
      
    });

  }
  backClicked() {
    this._location.back();
  }



}
