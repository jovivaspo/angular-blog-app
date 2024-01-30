import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  userExists(email: string): Observable<boolean> {
    return from(
      this.http.post<boolean>(`${BASE_URL}/api/user/exist`, { email })
    );
  }
}
