import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-rooms',
  standalone: false,
  
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.breadcrumbs[1] = 'Rooms'
  }

}
