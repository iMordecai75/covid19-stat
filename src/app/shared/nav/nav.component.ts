import { Component, OnInit } from '@angular/core';
import { Dati } from 'src/app/models/dati';
import { AuthService } from 'src/app/services/auth.service';
import { DatiService } from 'src/app/services/dati.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed: any;
  date: Date;

  constructor(
    private service: DatiService,
    public auth: AuthService
  ) { }

  getLatestData(): void {
    this.service.getLatestDati()
      .subscribe((res: Dati[]) => {
        const sdata = res[0].data;
        this.date = new Date(sdata);
        this.service.setDate(this.date);
      });
  }

  changeDate(date: Date): void {
    this.service.setDate(date);
  }

  ngOnInit(): void {
    this.getLatestData();
  }
}
