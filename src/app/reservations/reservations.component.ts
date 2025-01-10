import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { ApiService, Pagination } from '../services/api.service';
import { FormControl, NgForm } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
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

  guest_name:string = ""
  room_name:string = ""
  onSearchGuest$:Subject<null> = new Subject();
  onSearchRoom$:Subject<null> = new Subject();

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
  start:any = [
    TuiDay.currentLocal(),
    new TuiTime(0, 0),
];

today = TuiDay.currentLocal()

end = [
  TuiDay.currentLocal(),
  new TuiTime(0, 0),
];



resetForm(){
  this.start = [
    TuiDay.currentLocal(),
    new TuiTime(0, 0),
];
this.end = [
  TuiDay.currentLocal(),
  new TuiTime(0, 0),
];
this.selected_rooms = [] 
this.selected_guest = {name:'', email:'', phone_number:'',id: ''}
}

  refresher$:Subject<null> = new Subject();


  select_reservation(reservation:Reservation){
    this.selected_reservation = null;
    setTimeout(() => {
      this.selected_reservation = JSON.parse(JSON.stringify(reservation))

      this.selected_rooms = this.rooms.filter(ele => this.selected_reservation['rooms'].find((one:any) =>one.id == ele.id) )
      this.selected_guest = JSON.parse(JSON.stringify(this.selected_reservation['guest']))

      this.start = [
        TuiDay.fromLocalNativeDate(new Date(this.selected_reservation['start'])),
        TuiTime.fromLocalNativeDate(new Date(this.selected_reservation['start'])),
    ];
    this.end = [
      TuiDay.fromLocalNativeDate(new Date(this.selected_reservation['end'])),
      TuiTime.fromLocalNativeDate(new Date(this.selected_reservation['end'])),
    ];

    }, 10)
  }
  

  remove(){
    this.saving = true
    this.api.ReservationsService.remove(this.selected_reservation.id).subscribe( res => {
      this.refresher$.next(null)
    })
  }


  getReservations(page = 1){
    this.api.ReservationsService.index(page).subscribe((res:any) => {
      this.reservations = res.data
      this.pagination = res.pagination
    });
  }
  
  selected_guest:Guest = {name:'', email:'', phone_number:'',id: ''}
  selected_rooms:Room[] = [];


  onSearchGuest(){
    this.api.GuestsService.select(this.guest_name).subscribe((res:any) => {
      this.guests = res['data'];
    })
  }

  onSearchRoom(){
    this.api.RoomsService.select(this.room_name).subscribe((res:any) => {
      this.rooms = res['data'];
    })
  }


  

  ngOnInit(): void {

    this.onSearchGuest()
    this.onSearchGuest$.pipe(debounceTime(500)).subscribe(_ => this.onSearchGuest())

    this.onSearchRoom()
    this.onSearchRoom$.pipe(debounceTime(500)).subscribe(_ => this.onSearchRoom())

   
    // this.onSearchGuest()

    


    document.addEventListener('click', (event) => {
      this.reservations.forEach(reservation => {
        if(reservation.rooms_open){
          reservation.rooms_open = false;
        }
      })
    });


    

    this.api.RoomsService.index(1).subscribe((res:any) => {
      this.rooms = res['data'];
    })


    this.api.breadcrumbs[1] = 'Reservations'

    this.getReservations()

    this.refresher$.subscribe( _ => {
      this.getReservations()
      this.saving = false;
    })

    
  }
}
