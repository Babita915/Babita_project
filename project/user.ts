import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
       private baseUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user)
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
