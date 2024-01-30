import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { JWTDecoded, LoginForm, RegisterForm } from '../interfaces/auth';

const BASE_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>(`${BASE_URL}/api/auth/login`, {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          localStorage.setItem('access_token', token.access_token);
        })
      );
  }

  register(registerForm: RegisterForm) {
    return this.http
      .post<any>(`${BASE_URL}/api/user`, {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number> {
    return of(localStorage.getItem('access_token')).pipe(
      switchMap((jwt: any) =>
        of(this.jwtHelper.decodeToken(jwt)).pipe(
          tap((decoded: null | JWTDecoded) => console.log(decoded)),
          map((decoded: null | JWTDecoded) => {
            if (decoded) {
              return decoded.user.id;
            }
            return 0;
          })
        )
      )
    );
  }
}
