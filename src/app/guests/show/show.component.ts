import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Guest } from '../../services/guests.service';
import { Reservation } from '../../services/reservations.service';

@Component({
  selector: 'app-show',
  standalone: false,
  
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {



  guest:Guest | null = null;
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
      this.api.GuestsService.show(params['id']).subscribe((res:any)=>{
        this.guest = res['data']?.guest
        if(this.guest) this.guest.past_reservations_count = res['data']?.past_reservations.count
        this.api.ReservationsService.getGuestReservations(this.guest?.id).subscribe((res:any) => {
          this.reservations = res['data']
        })
      })
    })

  }

}
