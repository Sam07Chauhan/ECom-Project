import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, SignUp } from '../data';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Exposing the authentication state as an observable
  get isSellerLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  // Check if token exists in localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('user');
  }
  isLoginError = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }
  addUsers(data: SignUp) {
    this.http.post('http://localhost:3000/User', data, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('user', JSON.stringify(response.body));
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
  userLogin(data: Login): void {
    this.http.get(`http://localhost:3000/User?email=${data.Email}&password=${data.password}`, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          if (response && response.body && response.body.length === 1) {
            this.isLoginError.next(false);
            localStorage.setItem('seller', JSON.stringify(response.body));
            this.loggedIn.next(true);
            this.router.navigate(['seller-home']);
          } else {
            // Handle login error
            alert('Invalid credentials');
            this.loggedIn.next(false);
          }
        })
      )
      .subscribe();
  }
}
