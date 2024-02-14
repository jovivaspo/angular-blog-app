import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { JWTDecoded, LoginForm, RegisterForm } from '../interfaces/auth';

const BASE_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //User Logged
  private isLoggedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  //User Id
  private userIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

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
          this.getUserId().subscribe();
          this.isLoggedSubject.next(true);
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

  getUserId(): Observable<number | null> {
    return of(localStorage.getItem('access_token')).pipe(
      switchMap((jwt: any) =>
        of(this.jwtHelper.decodeToken(jwt)).pipe(
          tap((decoded: null | JWTDecoded) => console.log(decoded)),
          map((decoded: null | JWTDecoded) => {
            if (decoded) {
              this.setBehaiouUserId(decoded.user.id);
              return decoded.user.id;
            }
            this.setBehaiouUserId(null);
            return null;
          })
        )
      )
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.setBehaiouUserId(null);
    this.isLoggedSubject.next(false);
  }

  setBehaiouUserId(userId: number | null) {
    this.userIdSubject.next(userId);
  }

  getBehaiouUserId(): number | null {
    return this.userIdSubject.value;
  }
}
