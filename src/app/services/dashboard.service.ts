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

  private options: HttpHeaders = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpClient) { }

  getAnnotations(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/annotations.php?task=backend`);
  }

  postAnnotation(datiForm: NgForm): Observable<ApiResponse> {
    const body = this.body(datiForm);
    const token = localStorage.getItem('token');
    const options = this.options.append('Authorization', 'Bearer ' + token);

    return this.http.post<ApiResponse>(`${API}/annotations.php`, body, { headers: options })
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
      .set('Annotation_sValue', df.value.Annotation_sValue)
      .set('Annotation_sContent', df.value.Annotation_sContent);

    return params;
  }

}
