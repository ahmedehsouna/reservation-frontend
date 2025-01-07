import { Component, OnInit, signal } from '@angular/core';
import { ApiService, Pagination } from '../services/api.service';
import { FormControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Reservation } from '../services/reservations.service';
import { TuiDay, TuiTime } from '@taiga-ui/cdk/date-time';
import { Guest } from '../services/guests.service';
import { Room } from '../services/rooms.service';


interface User {
  readonly url: string;
  readonly name: string;
  readonly balance: number;
}

@Component({
  selector: 'app-reservations',
  standalone: false,
  
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {
  constructor(public api: ApiService) {}
  reservations:Reservation[] = [];

  protected readonly open = signal(false);


  protected readonly guest_stringify = ({name}: Guest): string => name || '';
  protected readonly room_stringify = ({name}: Room): string => name || '';



  guests:Array<Guest> = []
  rooms:Array<Room> = [];

  rooms_open:boolean = false;


  open_room = (reservation:Reservation) => setTimeout(()=> reservation.rooms_open = !reservation.rooms_open, 10) 

  selected_reservation:any = null;
  pagination:Pagination | null = null;
  saving:boolean = false;
  protected index = 4;
  protected length = 10;
  protected size = 10;
  protected readonly items = [10, 50, 100];

  showDatepicker: boolean = false;
  datepickerValue: any = '';
  protected readonly start:any = [
    TuiDay.currentLocal(),
    new TuiTime(0, 0),
];

today = TuiDay.currentLocal()

protected readonly end = [
  TuiDay.currentLocal(),
  new TuiTime(0, 0),
];

  refresher$:Subject<null> = new Subject();


  select_reservation(reservation:Reservation){
    this.selected_reservation = null;
    setTimeout(() => {
      this.selected_reservation = JSON.parse(JSON.stringify(reservation))
    }, 10)
  }
  

  store(form:NgForm){

    this.saving = true
    this.api.ReservationsService.store(form).subscribe( res => {
      this.refresher$.next(null)
      form.reset();
    })
  }

  update(form:NgForm){
    this.saving = true
    this.api.ReservationsService.update(form).subscribe( res => {
      this.refresher$.next(null)
      form.reset();
    })
  }

  remove(){
    this.saving = true
    this.api.ReservationsService.remove(this.selected_reservation.id).subscribe( res => {
      this.refresher$.next(null)
    })
  }


  getReservations(page = 1){
    console.log(page)
    this.api.ReservationsService.index(page).subscribe((res:any) => {
      this.reservations = res.data
      this.pagination = res.pagination
    });
  }
  
  selected_guest:Guest = {name:'', email:'', phone_number:'',}
  selected_rooms:Room[] = [];


  ngOnInit(): void {


    document.addEventListener('click', (event) => {
      this.reservations.forEach(reservation => {
        if(reservation.rooms_open){
          reservation.rooms_open = false;
        }
      })
    });

    this.api.GuestsService.index(1).subscribe((res:any) => {
      this.guests = res['data'];
    })

    this.api.RoomsService.index(1).subscribe((res:any) => {
      this.rooms = res['data'];
    })

    console.log(this.api.modal_template)

    this.api.breadcrumbs[1] = 'Reservations'

    this.getReservations()

    this.refresher$.subscribe( _ => {
      this.getReservations()
      this.api.close_modal()
      this.saving = false;
    })

    
  }
}
