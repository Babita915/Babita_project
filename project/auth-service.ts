import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8000'; 

  private _isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn || !!localStorage.getItem('JWT_Token');
  }

  // --- LOGIN ---
  login(userDetails: { username: string; password: string }): Observable<boolean> {

    const loginEndpoint = `${this.apiUrl}/api/auth/login`;   // <-- FIXED URL

    return this.http.post<any>(loginEndpoint, userDetails)
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('JWT_Token', response.token);
            this._isLoggedIn = true;
            return true;
          }
          console.error('Token missing in response.');
          return false;
        }),
        catchError((error: HttpErrorResponse) => {
          
          let errorMessage = 'Login failed.';

          if (error.status === 0) {
            errorMessage = 'Server is down or CORS issue.';
          } else if (error.status === 401) {
            errorMessage = 'Invalid username or password.';
          } else {
            errorMessage = `Server Error ${error.status}: ${error.message}`;
          }

          console.error(errorMessage, error);
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this._isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('JWT_Token');
  }
}
