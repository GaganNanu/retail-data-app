import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userEmail = new Subject<string>();
  constructor(private http: HttpClient) {
  }

  signUp(user: any) {
    return this.http.post(environment.apiUrl + `users/signup`, user, {responseType: 'text'})
  }

  signIn(user: any) {
    return this.http.post(environment.apiUrl + `users/signin`, user, {responseType: 'text'})
  }
}
