import { Component } from '@angular/core';
import { Login, SignUp } from '../data';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin = false;
  authError: string = '';
  constructor(private user:UserService, private router: Router){}
  ngOnInit(): void{
    this.user.userAuthReload();
  }
  signUp(data:SignUp){
    this.user.addUsers(data);
  }
  // Method to handle user login
  login(data: Login): void {
    this.authError = '';
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((error) => {
      if (error) {
        this.authError = "Email or password is not correct";
      } else {
        this.router.navigate(['user']);
      }
    });
  }
  openLogin(): void {
    this.showLogin = true;
  }

  // Method to toggle to sign-up view
  openSignUp(): void {
    this.showLogin = false;
  }
}
