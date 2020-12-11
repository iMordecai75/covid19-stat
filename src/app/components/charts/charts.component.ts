import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { DatiService } from 'src/app/services/dati.service';
import { Dati } from 'src/app/models/dati';
import { Regioni } from 'src/app/models/regioni';
import { ApiResponse } from 'src/app/models/api-response';
import { Annotations } from 'src/app/models/annotations';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit {

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
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: '03/12',
          borderColor: 'black',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'DPCM - 03/12'
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
  public dati: Dati[];
  public datireg: Regioni[];
  public annotations: Annotations[];
  public date: Date;
  public region = 'italia';


  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private datiService: DatiService) { }

  ngOnInit(): void {
    this.title = 'Italia';
    this.getDati();
  }

  // Recupero i dati nazionali
  private getDati(): void {
    this.datiService.getDati()
      .subscribe((res: ApiResponse) => {
        this.dati = res.items as Dati[];
        this.getRegioni();
      });
  }
  // Recupero i dati regionali
  private getRegioni(): void {
    this.datiService.getDatiReg()
      .subscribe((res: ApiResponse) => {
        this.datireg = res.items as Regioni[];
        this.regioni = this.datireg.map(t => t.denominazione_regione);

        this.getAnnotations();
      });

  }
  // Recupero le annotazioni
  private getAnnotations(): void {
    this.datiService.getAnnotations()
      .subscribe((res: ApiResponse) => {
        this.annotations = res.items as Annotations[];
        console.log(this.annotations);
        //
        this.datiService.getDate().subscribe((d) => {
          this.date = d;
          this.wait = false;
          this.updateDataset();
        });
       });
  }


  private updateDataset(): void {
    let data: any;
    // Filtro i dati per data e regione
    if (this.region === 'italia') {
      data = this.dati.filter((t: Dati) => {
        return new Date(t.data) <= this.date;
      });
    } else {
      data = this.datireg
        .filter((t: Regioni) => t.denominazione_regione === this.region)
        .filter((t: Regioni) => new Date(t.data) <= this.date);
    }
    const max = data.length;
    if (this.kind) {
      this.lineChartData[0].data = data.map(t => t.totale_positivi).filter((elem, index) => index > max - 30);
      this.lineChartData[1].data = data.map(t => t.totale_casi).filter((elem, index) => index > max - 30);
      this.lineChartData[2].data = data.map(t => t.dimessi_guariti).filter((elem, index) => index > max - 30);
    } else {
      this.lineChartData[0].data = data.map(t => t.variazione_totale_positivi).filter((elem, index) => index > max - 30);
      this.lineChartData[1].data = data.map(t => t.nuovi_positivi).filter((elem, index) => index > max - 30);
      this.lineChartData[2].data = data.map((t, i) => {
        if (i === 0) {
          return 0;
        } else {
          return t.dimessi_guariti - data[i - 1].dimessi_guariti;
        }
      }).filter((elem, index) => index > max - 30);
    }
    this.lineChartLabels = data.map(
      t => {
        const newd = new Date(t.data).toLocaleDateString();
        const len = newd.length;
        return newd.substr(0, len - 5);
      }).filter((elem, index) => index > max - 30);

    this.lineChartOptions.annotation.annotations = this.annotations;
  }

  public setKind(value): void {
    this.kind = value;
    this.updateDataset();
  }

  public getItalia(): void {
    this.title = 'Italia';
    this.region = 'italia';
    this.updateDataset();
  }

  public getRegione(id: string): void {
    this.title = id;
    this.region = id;
    this.updateDataset();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
