import { Component, OnInit } from '@angular/core';
import { ApiService, Pagination } from '../services/api.service';
import { Guest } from '../services/guests.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-guests',
  standalone: false,

  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent implements OnInit {
  constructor(public api: ApiService) {}
  guests:Guest[] = [];
  selected_guest:any = null;
  pagination:Pagination | null = null;
  saving:boolean = false;
  protected index = 4;
  protected length = 10;
  protected size = 10;
  protected readonly items = [10, 50, 100];

  refresher$:Subject<null> = new Subject();


  select_guest(guest:Guest){
    this.selected_guest = null;
    setTimeout(() => {
      this.selected_guest = JSON.parse(JSON.stringify(guest))
    }, 10)
  }
  



 


  getGuests(page = 1){
    this.api.GuestsService.index(page).subscribe((res:any) => {
      this.guests = res.data
      this.pagination = res.pagination
    });
  }
  

  ngOnInit(): void {


    this.api.breadcrumbs[1] = 'Guests'

    this.getGuests()

    this.refresher$.subscribe( _ => {
      this.getGuests()
      this.saving = false;
    })

    
  }
}
