import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Dati } from '../models/dati';
import { Province } from '../models/province';
import { Regioni } from '../models/regioni';
import { Annotations } from '../models/annotations';

// const API = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json';
const API = 'http://www.federicomasci.com/angular/covid19/api';


@Injectable({
  providedIn: 'root'
})
export class DatiService {

  dati: Dati[];
  // date: Date;
  observer = new BehaviorSubject<Date>(new Date());
  date = this.observer.asObservable();

  constructor(private http: HttpClient) { }

  // LETTURA DATI NAZIONALI
  getDati(): Observable<Dati[]> {
    return this.http.get<Dati[]>(`${API}/index.php`);
  }

  getAllDatiReg(): Observable<Regioni[]> {
    return this.http.get<Regioni[]>(`${API}/regioni.php`);
  }

  getAllDatiProv(): Observable<Province[]> {
    return this.http.get<Province[]>(`${API}/province.php`);
  }

  // LETTURA ULTIMI DATI NAZIONALI
  getLatestDati(): Observable<Dati[]> {
    return this.http.get<Dati[]>(`${API}/index.php?task=latest`);
  }

  // LETTURA DATI REGIONALI
  getDatiReg(): Observable<Regioni[]> {
    return this.http.get<Regioni[]>(`${API}/regioni.php?task=latest`);
  }

  // LETTURA DATI PROVINCIALI
  getDatiProv(): Observable<Province[]> {
    return this.http.get<Province[]>(`${API}/province?task=latest`);
  }

  getAnnotation(): Observable<Annotations[]> {
    return this.http.get<Annotations[]>(`${API}/annotations.php`);
  }

  getDate(): Observable<Date> {
    return this.date;
  }

  setDate(date: Date): void {
    // this.date = date;
    this.observer.next(date);
  }
}
