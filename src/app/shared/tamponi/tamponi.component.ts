import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Dati } from 'src/app/models/dati';

@Component({
  selector: 'app-tamponi',
  templateUrl: './tamponi.component.html',
  styleUrls: ['./tamponi.component.scss']
})
export class TamponiComponent implements OnInit, OnChanges {

  @Input() dati: Dati[];
  @Input() date: Date;

  totale: number;
  incidenza: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.date && changes.date.currentValue !== 'undefined') {
      this.date = changes.date.currentValue;
      this.calculate();
    }
  }

  private calculate(): void {
    const date2: string = new Date(this.date.getTime() - (1 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
    const filterdata = this.dati.filter(t => t.data.slice(0, 10) === this.date.toISOString().slice(0, 10));
    const filterdata2 = this.dati.filter(t => t.data.slice(0, 10) === date2.slice(0, 10));

    this.totale = filterdata[0].tamponi - filterdata2[0].tamponi;
    this.incidenza = (filterdata[0].nuovi_positivi / this.totale) * 100;
  }

}
