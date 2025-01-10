import { Component, OnInit } from '@angular/core';
import { ApiService, Pagination } from '../services/api.service';
import { FormControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Room } from '../services/rooms.service';

@Component({
  selector: 'app-rooms',
  standalone: false,
  
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  constructor(public api: ApiService) {}
  rooms:Room[] = [];

  selected_room:any = null;
  pagination:Pagination | null = null;
  saving:boolean = false;

  refresher$:Subject<null> = new Subject();


  sort_by: 'number' | 'name' | 'upcoming_reservations_count' = 'number'
  order: 'asc' | 'desc'  = 'desc'
  select_room(room:Room){
    this.selected_room = null;
    setTimeout(() => {
      this.selected_room = JSON.parse(JSON.stringify(room))
    }, 10)
  }
  


  getRooms(page = 1){

    this.api.RoomsService.index(page, this.sort_by, this.order).subscribe((res:any) => {
      this.rooms = res.data
      this.pagination = res.pagination
    });
  }
  



  ngOnInit(): void {


    this.api.breadcrumbs[1] = 'Rooms'

    this.getRooms()

    this.refresher$.subscribe( _ => {
      this.getRooms()
      this.saving = false;
    })

    
  }
}
