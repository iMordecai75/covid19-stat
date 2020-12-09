import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response';

const ApiUrl = environment.authurl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private options: HttpHeaders = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpClient) { }

  login(datiForm: NgForm): Observable<AuthResponse> {
    const body = this.body(datiForm);

    return this.http.post<AuthResponse>(`${ApiUrl}/`, body, { headers: this.options })
      .pipe(
        map((res: AuthResponse) => {
          if (res.User_sToken) {
            this.setSession(res.User_sToken);
          }

          return res;
        }),
        catchError(this.errorHandler)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
  }

  notExpired(): boolean {

    let notExpired = false;

    if (localStorage.getItem('expire')) {
      let expire: number = parseInt(localStorage.getItem('expire'), 10);

      notExpired = new Date().getTime() < expire;

      if (notExpired) {
        expire = new Date().getTime() + 60000;

        localStorage.setItem('expire', expire.toString());
      }
    }

    return notExpired;
  }

  errorHandler(error: any): Observable<never> {
    console.log(error);
    let msg: string;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        msg = 'Applicazione offline';
      } else {
        msg = `Si è verificato un errore: ${error.error.msg} (server status code ${error.status})`;
      }

      return throwError(msg);
    }

    return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  }

  private setSession(jwt: string): void {
    const expire: number = new Date().getTime() + 60000;

    localStorage.setItem('token', jwt);
    localStorage.setItem('expire', expire.toString());
  }

  private body(df: NgForm): HttpParams {
    const params = new HttpParams()
      .set('username', df.value.username)
      .set('password', df.value.password);

    return params;
  }


}
