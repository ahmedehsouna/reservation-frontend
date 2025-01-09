import { Component, OnInit } from '@angular/core';
import { TuiMonth, TuiYear } from '@taiga-ui/cdk/date-time';
import { ApiService } from '../services/api.service';
import { Reservation } from '../services/reservations.service';

@Component({
  selector: 'app-calendar',
  standalone: false,

  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {


  constructor(private api:ApiService){}


  reservations:Reservation[] = [];

  open_room = (reservation:Reservation) => setTimeout(()=> reservation.rooms_open = !reservation.rooms_open, 10) 


  today = new Date();
  selectedMonth = this.today.getMonth();
  year = this.today.getFullYear();

  // Get the number of days in the current month
  daysInMonth: any;
  days_reservations_count: any = {}
  selected_day:number = 0;
  selected_day_format:string = ""

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




  select_day(day:number){
    this.selected_day = day;
    this.selected_day_format = this.selectedYear + '-' + (this.selectedMonth + 1) + '-' + day
    this.api.ReservationsService.getReservationsByDay(this.selected_day_format).subscribe((res:any) => {
      this.reservations = res['data']
    })
  }


  numberToArray(num: number) {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  }

  onMonthChanged({year, month}:{year:number, month:number}) {
    this.selectedYear = year;
    this.selectedMonth = month
    this.daysInMonth = this.numberToArray(
      +(new Date(year, month + 1, 0).getDate())
    );

    let start = year + '-' + (month + 1) + '-' + this.daysInMonth[0]
    let end = year + '-' + (month + 1) + '-' + this.daysInMonth[this.daysInMonth.length -1]

    this.api.ReservationsService.countReservationsMonthly(start, end).subscribe((res:any) => {
      this.days_reservations_count = res['data']
    })

    

  }

  ngOnInit(): void {
    document.addEventListener('click', (event) => {
      this.reservations.forEach(reservation => {
        if(reservation.rooms_open){
          reservation.rooms_open = false;
        }
      })
    });
    this.onMonthChanged({year:this.year,month:this.selectedMonth});
  }
}
