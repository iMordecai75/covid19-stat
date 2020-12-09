import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Province } from 'src/app/models/province';
import { Regioni } from 'src/app/models/regioni';
import { DatiService } from 'src/app/services/dati.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reg-detail',
  templateUrl: './reg-detail.component.html',
  styleUrls: ['./reg-detail.component.scss']
})
export class RegDetailComponent implements OnInit {

  id: string;
  regioni: Regioni[];
  province: Province[];
  province2: Province[];
  date: Date;
  filterreg: Regioni[];
  filterprov: Province[];
  filterprov2: Province[];

  constructor(
    private datiService: DatiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getDetailReg(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.datiService.getDatiReg()
      .subscribe(res => {
        const items = res.items as Regioni[];
        this.regioni = items.filter(t => t.denominazione_regione === this.id);
        this.getDetailProvReg();
      });
  }

  getDetailProvReg(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.datiService.getDatiProv()
      .subscribe(res => {
        this.province = res.filter(t => t.denominazione_regione === this.id);
        this.datiService.getDate().subscribe((d: Date) => {
          const date2: string = new Date(d.getTime() - (1 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
          // this.filterreg = this.regioni.filter(t => t.data.slice(0, 10) === d.toISOString().slice(0, 10));
          this.filterprov = this.province.filter(t => t.data.slice(0, 10) === d.toISOString().slice(0, 10))
            .filter(t => t.sigla_provincia !== null);
          this.filterprov2 = this.province.filter(t => t.data.slice(0, 10) === date2.slice(0, 10))
            .filter(t => t.sigla_provincia !== null);
          this.date = d;
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getDetailReg();
  }

}
