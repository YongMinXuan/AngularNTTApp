import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, of,} from  'rxjs';
import { Report } from './report';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER = "http://localhost:3000";
  authSubject = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient,private router: Router) { }

  register(user: User): Observable<JwtResponse> {
    console.log('register function: ',user)
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`, user).pipe(
      tap((res:  JwtResponse ) => {
        console.log('res: ',res)
        console.log('res: ',res.user)
        console.log('res 2: ',res.user.expires_in)
        console.log('res 3: ',res.user.access_token)
       // localStorage.setItem("ACCESS_TOKEN12","kame");
        console.log('res 3: ',res.access_token)
   
        console.log('res 7: ',expirein) 
        console.log('res 9: ',accesstoken)
       
        if (res.user) {
          var expirein = res.expires_in.toString()
          var accesstoken = res.access_token 
          localStorage.setItem("ACCESS_TOKEN", res.access_token);
          localStorage.setItem("EXPIRES_IN",expirein);
          localStorage.setItem("admin",res.user.admin);
          localStorage.setItem("userid",res.user.name);
          this.authSubject.next(true);
        }
      })

    );
  }

  signIn(user: User): Observable<JwtResponse> {
    console.log('sign in user:',user)
    return this.httpClient.post(`${this.AUTH_SERVER}/login`, user).pipe(
      tap(async (res: JwtResponse) => {
        console.log('res', res)
        var expirein = res.expires_in.toString()
        var accesstoken = res.access_token 
        console.log('res 23: ',expirein) 
        console.log('res 92: ',accesstoken)
        console.log('login res: ',res.user.admin)
        if (res.user) {
          localStorage.setItem("ACCESS_TOKEN", res.access_token );
          localStorage.setItem("EXPIRES_IN",expirein);
          localStorage.setItem("admin",res.user.admin);
          localStorage.setItem("userid",res.user.name);
          this.authSubject.next(true);
        }

        if (!res.user) {
         console.log('no such user')
        }

      
      })
    );
  }
  submitReport(report: Report): Observable<any> {
    console.log('report:', report)
    return this.httpClient.post(`${this.AUTH_SERVER}/submitreport`, report).pipe(
      tap(async (res: any) => {
       console.log(res)
      
      })
    );
  }

  viewReport(): Observable<any> {
    
    return this.httpClient.get(`${this.AUTH_SERVER}/viewreport`).pipe(
      tap(async (res: any) => {
       console.log(res)
      
      })
    );
  }

  viewNonAdminReport(): Observable<any> {
    
    return this.httpClient.get(`${this.AUTH_SERVER}/viewnonAdminreport`).pipe(
      tap(async (res: any) => {
       console.log(res)
      
      })
    );
  }
  editReport(report: Report): Observable<any> {
    console.log('report:', report)
    return this.httpClient.post(`${this.AUTH_SERVER}/editreport`, report).pipe(
      tap(async (res: any) => {
       console.log(res)
      
      })
    );
  }

  approveReport(report: Report): Observable<any> {
    console.log('report:', report)
    return this.httpClient.post(`${this.AUTH_SERVER}/approvereport`, report).pipe(
      tap(async (res: any) => {
       console.log(res)
      
      })
    );
  }

  revokeReport(report: Report): Observable<any> {
    console.log('revok report:', report)
    return this.httpClient.post(`${this.AUTH_SERVER}/revokereport`, report).pipe(
      tap(async (res: any) => {
       console.log(res)
      
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }

 

  signOut() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("admin");
    localStorage.removeItem("userid");
    this.authSubject.next(false);
    this.router.navigateByUrl('');
  }

  isAuthenticated() {
    return  this.authSubject.asObservable();
  }
}