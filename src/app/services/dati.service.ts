import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dati } from '../models/dati';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response';

const API = environment.url;


@Injectable({
  providedIn: 'root'
})
export class DatiService {

  dati: Dati[];
  observer = new BehaviorSubject<Date>(new Date());
  date = this.observer.asObservable();

  constructor(private http: HttpClient) { }

  // LETTURA DATI NAZIONALI
  getDati(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/index.php`);
  }

  getLatestDati(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/index.php?task=latest`);
  }

  // LETTURA DATI REGIONALI
  getDatiReg(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/regioni.php`);
  }

  getLatestDatiReg(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/regioni.php?task=latest`);
  }

  // LETTURA DATI PROVINCIALI
  getDatiProv(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/province.php`);
  }

  getLatestDatiProv(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/province?task=latest`);
  }

  getAnnotations(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/annotations.php`);
  }

  getDate(): Observable<Date> {
    return this.date;
  }

  setDate(date: Date): void {
    // this.date = date;
    this.observer.next(date);
  }
}
