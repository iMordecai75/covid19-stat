import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {

  @Input() date: Date;
  @Output() newdate: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() { }

  changeHandler(): void {
    this.date.setHours(17);
    this.newdate.emit(this.date);
  }

  ngOnInit(): void {
  }

}
