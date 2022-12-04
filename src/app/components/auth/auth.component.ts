import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isSignUp = false;
  userNameControl = new FormControl('');
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  signInUserNameControl = new FormControl('');
  signInPasswordControl = new FormControl('');

  constructor(private authService: AuthService, private toastr: ToastrService) {

  }
  public toggleSignup(mode: string) {
    this.isSignUp = mode == 'sign-up';
  }

  public signUp() {
    const user = { userName: this.userNameControl.value, password: this.passwordControl.value, email: this.emailControl.value }
    this.authService.signUp(user).subscribe(response => {
      if (response == true) {
        this.toastr.success('Signed up sucessfully!')
      } else {
        this.toastr.error('Error while signing up!')
      }
    });
  }

  public signIn() {
    const user = { userName: this.userNameControl.value, password: this.passwordControl.value }
    this.authService.signIn(user).subscribe(response => {
      if (response == true) {
        this.toastr.success('Sign in sucessfull!')
      } else {
        this.toastr.error('Error while signing in!')
      }
    });
  }
}
