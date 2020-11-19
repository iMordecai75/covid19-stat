import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Dati } from '../models/dati';
import { Province } from '../models/province';
import { Regioni } from '../models/regioni';

const API = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json';


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
    return this.http.get<Dati[]>(`${API}/dpc-covid19-ita-andamento-nazionale.json`);
  }

  // LETTURA ULTIMI DATI NAZIONALI
  getLatestDati(): Observable<Dati[]> {
    return this.http.get<Dati[]>(`${API}/dpc-covid19-ita-andamento-nazionale-latest.json`);
  }

  // LETTURA DATI REGIONALI
  getDatiReg(): Observable<Regioni[]> {
    return this.http.get<Regioni[]>(`${API}/dpc-covid19-ita-regioni-latest.json`);
  }

  // LETTURA DATI PROVINCIALI
  getDatiProv(): Observable<Province[]> {
    return this.http.get<Province[]>(`${API}/dpc-covid19-ita-province-latest.json`);
  }

  getAllDatiReg(): Observable<Regioni[]> {
    return this.http.get<Regioni[]>(`${API}/dpc-covid19-ita-regioni.json`);
  }

  getAllDatiProv(): Observable<Province[]> {
    return this.http.get<Province[]>(`${API}/dpc-covid19-ita-province.json`);
  }

  getDate(): Observable<Date> {
    return this.date;
  }

  setDate(date: Date): void {
    // this.date = date;
    this.observer.next(date);
  }
}
