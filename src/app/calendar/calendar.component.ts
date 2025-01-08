import { Component, OnInit } from '@angular/core';
import { TuiMonth, TuiYear } from '@taiga-ui/cdk/date-time';

@Component({
  selector: 'app-calendar',
  standalone: false,

  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  today = new Date();
  selectedMonth = this.today.getMonth();
  year = this.today.getFullYear();

  // Get the number of days in the current month
  daysInMonth: any;

  selectedYear: number = new Date().getFullYear();
  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];


  log = console.log


  numberToArray(num: number) {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  }

  onMonthChanged({year, month}:{year:number, month:number}) {
    this.daysInMonth = this.numberToArray(
      +(new Date(year, month + 1, 0).getDate())
    );
  }

  ngOnInit(): void {
    this.onMonthChanged({year:this.year,month:this.selectedMonth});
  }
}
