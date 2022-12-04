import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(user: any) {
    return this.http.post(environment.apiUrl + `/users/signup`, user)
  }

  signIn(user: any) {
    return this.http.post(environment.apiUrl + `/users/signin`, user)
  }
}
