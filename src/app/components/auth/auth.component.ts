import { AfterContentChecked, Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterContentChecked {
  isSignUp = false;
  userNameControl = new FormControl('');
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  signInUserNameControl = new FormControl('');
  signInPasswordControl = new FormControl('');
  @Output() onLogin = new EventEmitter<string>();
  loggedInEmail: string
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.authService.userEmail.subscribe(email => {
      this.loggedInEmail = email;
    });
  }

  ngAfterContentChecked() {
    if (localStorage.getItem("email")) {
      this.router.navigateByUrl('/sample');
    }
  }
  public toggleSignup(mode: string) {
    this.isSignUp = mode == 'sign-up';
  }

  public signUp() {
    if (!this.userNameControl.value || !this.passwordControl.value || !this.emailControl.value) {
      this.toastr.error('Fill all the values before submitting!');
      return;
    }
    const user = { userName: this.userNameControl.value, password: this.passwordControl.value, email: this.emailControl.value };
    this.authService.signUp(user).subscribe(response => {
      if (response == "true") {
        this.toastr.success('Signed up sucessfully!');
        this.authService.userEmail.next(this.emailControl.value as string);
        this.router.navigateByUrl('/sample');
        localStorage.setItem("email", this.emailControl.value as string);
      } else {
        this.toastr.error('Error while signing up!');
      }
    }, err => this.toastr.error(''));
  }

  public signIn() {
    const user = { userName: this.userNameControl.value, password: this.passwordControl.value };
    if (!this.userNameControl.value || !this.passwordControl.value) {
      this.toastr.error('Fill username and password before submitting!');
      return;
    }
    this.authService.signIn(user).subscribe(response => {
      if (response) {
        this.toastr.success('Sign in sucessfull!');
        this.authService.userEmail.next(response as string);
        this.router.navigateByUrl('/sample');
        localStorage.setItem("email", response);
      } else {
        this.toastr.error('Error while signing in!');
      }
    }, err => this.toastr.error('Invalid credentials!'));
  }
}
