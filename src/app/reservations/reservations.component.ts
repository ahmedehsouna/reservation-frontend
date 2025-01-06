import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reservations',
  standalone: false,
  
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {


  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.breadcrumbs[1] = 'Reservations'

  }

}
