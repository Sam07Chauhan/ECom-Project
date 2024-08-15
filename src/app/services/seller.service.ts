import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Exposing the authentication state as an observable
  get isSellerLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  isLoginError = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // Check if token exists in localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('seller');
  }

  // Method to handle user sign-up
  userSignUp(data: SignUp): void {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('seller', JSON.stringify(response.body));
          this.loggedIn.next(true);
          this.router.navigate(['seller-home']);
        })
      )
      .subscribe();
  }

  // Method to handle user login
  userLogin(data: Login): void {
    this.http.get(`http://localhost:3000/seller?email=${data.Email}&password=${data.password}`, { observe: 'response' })
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

  // Method to log out the user
  logout(): void {
    localStorage.removeItem('seller');
    this.loggedIn.next(false);
    this.router.navigate(['seller-auth']);
  }
}






// import { EventEmitter, Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Login, SignUp } from '../data';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class SellerService {
//   isSellerLoggedIn = new BehaviorSubject<boolean>(false);
//   isLoginError = new EventEmitter<boolean>();

//   constructor(private http: HttpClient, private router: Router) {}

//   // Method to handle user sign-up
//   userSignUp(data: SignUp): void {
//     this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
//       .pipe(
//         catchError(this.handleError)
//       )
//       .subscribe((result: any) => {
//         this.isSellerLoggedIn.next(true);
//         localStorage.setItem('seller', JSON.stringify(result.body));
//         this.router.navigate(['seller-home']);
//       });
//   }

//   // Method to handle user login
//   userLogin(data: Login): void {
//     this.http.get(`http://localhost:3000/seller?email=${data.Email}&password=${data.password}`, { observe: 'response' })
//       .pipe(
//         catchError(this.handleError)
//       )
//       .subscribe((result: any) => {
//         if (result && result.body && result.body.length === 1) {
//           this.isLoginError.emit(false);
//           localStorage.setItem('seller', JSON.stringify(result.body));
//           this.router.navigate(['seller-home']);
//           console.warn("Logged in");
//         } else {
//           console.warn("Login failed");
//           this.isLoginError.emit(true);
//         }
//       });
//   }

//   // Method to reload the seller's session if a seller is already logged in
//   reloadSeller(): void {
//     if (localStorage.getItem('seller')) {
//       this.isSellerLoggedIn.next(true);
//       this.router.navigate(['seller-home']);
//     }
//   }

//   // Method to handle errors from HTTP requests
//   private handleError(error: HttpErrorResponse): Observable<never> {
//     console.error('An error occurred:', error.error);
//     return throwError('Something went wrong; please try again later.');
//   }
// }
