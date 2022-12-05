import { Component } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'retail-data-app';
  /**
   *
   */
  email: any = localStorage.getItem("email");
  constructor(private authService: AuthService) {
    this.authService.userEmail.subscribe(email => {
      this.email = email;
    })
  }
}
