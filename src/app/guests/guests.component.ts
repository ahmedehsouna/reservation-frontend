import { Component, OnInit } from '@angular/core';
import { ApiService, Guest } from '../services/api.service';

@Component({
  selector: 'app-guests',
  standalone: false,

  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent implements OnInit {
  constructor(private api: ApiService) {}
  guests:Guest[] = [];

  protected index = 4;
  protected length = 10;
  protected size = 10;
  protected readonly items = [10, 50, 100];


  ngOnInit(): void {
    this.api.get('guests').subscribe((res:any) => {
      this.guests = res.data
    });
  }
}
