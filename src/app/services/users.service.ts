import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UsersPaginated } from '../interfaces/user.interface';

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

  findAll(page = 1, limit = 10): Observable<UsersPaginated> {
    let params = new HttpParams();

    params = params.append('page', Number(page));
    params = params.append('limit', Number(limit));

    return this.http
      .get<UsersPaginated>(`${BASE_URL}/api/user`, { params })
      .pipe(
        map((usersPaginated: UsersPaginated) => {
          console.log('### usuarios paginados: ', usersPaginated);
          return usersPaginated;
        })
      );
  }

  paginateByName(
    page: number,
    size: number,
    name: string
  ): Observable<UsersPaginated> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http
      .get<UsersPaginated>(`${BASE_URL}/api/user`, { params })
      .pipe(
        map((usersPaginated: UsersPaginated) => {
          console.log('### usuarios paginados: ', usersPaginated);
          return usersPaginated;
        })
      );
  }

  findOne(id: number): Observable<User> {
    console.log('## ID: ', id);
    return this.http
      .get(`${BASE_URL}/api/user/${id}`)
      .pipe(map((user: User) => user));
  }

  updateOne(user: User): Observable<User> {
    return this.http
      .put<User>(`${BASE_URL}/api/user/${user.id}`, user)
      .pipe(map((user: User) => user));
  }
  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>(`${BASE_URL}/api/user/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
