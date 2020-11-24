import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { DatiService } from 'src/app/services/dati.service';
import { Dati } from 'src/app/models/dati';
import { Regioni } from 'src/app/models/regioni';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit, OnChanges {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Positivi' },
    { data: [], label: 'Contagi' },
    { data: [], label: 'Dimessi/Guariti' }
  ];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: '24/10',
          borderColor: 'black',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'DPCM - 24/10'
          }
        },
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: '03/11',
          borderColor: 'black',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'DPCM - 03/11'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255, 170, 0, .1)',
      borderColor: 'rgba(255, 170, 0, 1)',
      pointBackgroundColor: 'rgba(255, 170, 0, .5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 170, 0, .8)'
    },
    {
      backgroundColor: 'rgba(255, 0, 0, .1)',
      borderColor: 'rgba(255, 0, 0, 1)',
      pointBackgroundColor: 'rgba(255, 0, 0, .5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 0, 0, .8)'
    },
    {
      backgroundColor: 'rgba(0, 128, 0, .1)',
      borderColor: 'rgba(0, 128, 0, 1)',
      pointBackgroundColor: 'rgba(0, 128, 0, .5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 128, 0, .8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  public wait = true;
  public regioni: string[];
  public title: string;
  public kind = true;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  dati: Dati[];
  datireg: Regioni[];

  constructor(private datiService: DatiService) { }

  ngOnInit(): void {
    this.getDati();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  private getDati(): void {
    this.datiService.getDati()
      .subscribe((res: Dati[]) => {
        this.dati = res;
        const max = res.length;
        this.lineChartLabels = res.map(
          t => new Date(t.data).toLocaleDateString()
            .padStart(10, '0')
            .substr(0, 5)).filter((elem, index) => index > max - 30
            );
        this.updateDataset(res);
        this.getRegioni();
        this.title = 'Italia';
      });
  }

  private getRegioni(): void {
    this.datiService.getDatiReg()
      .subscribe((res: Regioni[]) => {
        this.regioni = res.map(t => t.denominazione_regione);
        this.wait = false;
      });

  }

  private updateDataset(res: any): void {
    const max = res.length;
    if (this.kind) {
      this.lineChartData[0].data = res.map(t => t.totale_positivi).filter((elem, index) => index > max - 30);
      this.lineChartData[1].data = res.map(t => t.totale_casi).filter((elem, index) => index > max - 30);
      this.lineChartData[2].data = res.map(t => t.dimessi_guariti).filter((elem, index) => index > max - 30);
    } else {
      this.lineChartData[0].data = res.map(t => t.variazione_totale_positivi).filter((elem, index) => index > max - 30);
      this.lineChartData[1].data = res.map(t => t.nuovi_positivi).filter((elem, index) => index > max - 30);
      this.lineChartData[2].data = res.map((t, i) => {
        if (i === 0) {
          return 0;
        } else {
          return t.dimessi_guariti - res[i - 1].dimessi_guariti;
        }
      }).filter((elem, index) => index > max - 30);
    }
        // this.chart.update();
  }

  public setKind(value): void {
    this.kind = value;
    this.getItalia();
  }

  public getItalia(): void {
    this.updateDataset(this.dati);
    this.title = 'Italia';
  }

  public getRegione(id: string): void {
    if (!this.datireg) {
      this.datiService.getAllDatiReg()
        .subscribe((res: Regioni[]) => {
          const reg: Regioni[] = res.filter(t => t.denominazione_regione === id);
          this.updateDataset(reg);
          this.title = id;
        });
    } else {
      const reg: Regioni[] = this.datireg.filter(t => t.denominazione_regione === id);
      this.updateDataset(reg);
      this.title = id;
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
