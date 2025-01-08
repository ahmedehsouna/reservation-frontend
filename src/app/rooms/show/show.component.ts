import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../services/reservations.service';
import { Room } from '../../services/rooms.service';

@Component({
  selector: 'app-show',
  standalone: false,
  
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {



  room:Room | null = null;
  reservations:Array<Reservation> = []
  open_room = (reservation:Reservation) => setTimeout(()=> reservation.rooms_open = !reservation.rooms_open, 10) 
  constructor(private api:ApiService, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {

    document.addEventListener('click', (event) => {
      this.reservations.forEach(reservation => {
        if(reservation.rooms_open){
          reservation.rooms_open = false;
        }
      })
    });
    
    this.activatedRoute.params.subscribe(params => {
      this.api.RoomsService.show(params['id']).subscribe((res:any)=>{
        this.room = res['data']
        this.api.ReservationsService.getRoomReservations(this.room?.id).subscribe((res:any) => {
          this.reservations = res['data']
        })
      })
    })

  }

}
