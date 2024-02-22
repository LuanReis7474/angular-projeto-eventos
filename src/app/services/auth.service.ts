import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlAPi } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, pass: string): Observable<any> {
    let body = {
      email: email,
      password: pass
    }

    return this.http.post(urlAPi + "/auth/login", body);
  }

  logout() {
    sessionStorage.setItem('user', '');
  }

  saveSession(user: string) {
    sessionStorage.setItem('user', user);

    return user;
  }

  isAuthenticated() {

    const user = sessionStorage.getItem('user');
    if (user) {
      return true;
    }
    else {
      return false;
    }


  }
}
