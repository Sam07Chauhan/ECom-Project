import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: string = '';

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {}

  // Method to handle user sign-up
  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  // Method to handle user login
  login(data: Login): void {
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((error) => {
      if (error) {
        this.authError = "Email or password is not correct";
      } else {
        this.router.navigate(['seller-home']);
      }
    });
  }

  // Method to toggle to login view
  openLogin(): void {
    this.showLogin = true;
  }

  // Method to toggle to sign-up view
  openSignUp(): void {
    this.showLogin = false;
  }
}

