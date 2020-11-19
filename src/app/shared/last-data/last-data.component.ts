import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Dati } from 'src/app/models/dati';

@Component({
  selector: 'app-last-data',
  templateUrl: './last-data.component.html',
  styleUrls: ['./last-data.component.scss']
})
export class LastDataComponent implements OnInit, OnChanges {

  @Input() titolo: string;
  @Input() dati: Dati[];
  @Input() date: Date;
  @Input() class: string;
  @Input() property: string;

  totale: number;
  incremento: number;
  diffIncremento: number;
  filterdata: Dati[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( this.date && changes.date.currentValue !== 'undefined') {
      this.date = changes.date.currentValue;
      this.calculate();
    }
  }

  private calculate(): void {
    const date2: string = new Date(this.date.getTime() - (1 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
    const filterdata = this.dati.filter(t => t.data.slice(0, 10) === this.date.toISOString().slice(0, 10));
    const filterdata2 = this.dati.filter(t => t.data.slice(0, 10) === date2.slice(0, 10));
    this.totale = filterdata[0][this.property];
    this.incremento = this.totale - filterdata2[0][this.property];
    // this.diffIncremento = this.incremento - (filterdata2[0][this.property] - filterdata[0][this.property]);
  }

}
