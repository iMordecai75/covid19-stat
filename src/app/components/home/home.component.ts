import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Dati } from 'src/app/models/dati';
import { Province } from 'src/app/models/province';
import { Regioni } from 'src/app/models/regioni';
import { DatiService } from 'src/app/services/dati.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dati: Dati[];
  regioni: Regioni[];
  province: Province[];
  filterdata: Dati[];
  filterreg: Regioni[];
  filterprov: Province[];
  date: Date;

  constructor(
    private datiService: DatiService
  ) { }

  getDati(): void {
    this.datiService.getDati()
      .subscribe((res: Dati[]) => {
        this.dati = res;
        this.getDatiReg();
      });
  }

  getDatiReg(): void {
    this.datiService.getAllDatiReg()
      .subscribe((res: Regioni[]) => {
        this.regioni = res;
        this.getDatiProv();
      });
  }

  getDatiProv(): void {
    this.datiService.getAllDatiProv()
      .subscribe((res: Province[]) => {
        this.province = res;
        this.datiService.getDate().subscribe((d) => {
          this.date = d;
          // this.filterdata = this.dati.filter(t => t.data.slice(0, 10) === date.slice(0, 10));
          this.filterreg = this.regioni.filter(t => t.data.slice(0, 10) === d.toISOString().slice(0, 10));
          this.filterprov = this.province.filter(t => t.data.slice(0, 10) === d.toISOString().slice(0, 10));
        });
      });
  }

  ngOnInit(): void {
    this.getDati();
  }

}
