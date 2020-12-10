import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response';

const API = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAnnotations(): Observable<ApiResponse> {
    const token = localStorage.getItem('token');
    const options = this.headers(token);

    return this.http.get<ApiResponse>(`${API}/annotations.php`, {headers: options});
  }

  getAnnotation(id: number): Observable<ApiResponse> {
    const token = localStorage.getItem('token');
    const options = this.headers(token);

    return this.http.get<ApiResponse>(`${API}/annotations.php?id=${id}`, { headers: options });
  }

  postAnnotation(datiForm: NgForm): Observable<ApiResponse> {
    const body = this.body(datiForm);
    const token = localStorage.getItem('token');
    const options = this.headers(token);

    return this.http.post<ApiResponse>(`${API}/annotations.php`, body, { headers: options })
      .pipe(
        map((res: ApiResponse) => {
          return res;
        }),
        catchError(this.errorHandler)
      );
  }

  putAnnotation(datiForm: NgForm): Observable<ApiResponse> {
    const body = this.body(datiForm);
    const token = localStorage.getItem('token');
    const options = this.headers(token);

    return this.http.put<ApiResponse>(`${API}/annotations.php`, body, { headers: options })
      .pipe(
        map((res: ApiResponse) => {
          return res;
        }),
        catchError(this.errorHandler)
      );
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


  private body(df: NgForm): HttpParams {
    const params = new HttpParams()
      .set('Annotation_iId', df.value.Annotation_iId)
      .set('Annotation_sValue', df.value.Annotation_sValue)
      .set('Annotation_sContent', df.value.Annotation_sContent);

    return params;
  }

  private headers(token: string): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders()
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer ' + token);

    return headers;
  }

}
