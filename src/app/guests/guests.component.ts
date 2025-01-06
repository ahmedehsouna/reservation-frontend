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
  

  store(form:NgForm){
    this.saving = true
    this.api.GuestsService.store(form).subscribe( res => {
      this.refresher$.next(null)
      form.reset();
    })
  }

  update(form:NgForm){
    this.saving = true
    this.api.GuestsService.update(form).subscribe( res => {
      this.refresher$.next(null)
      form.reset();
    })
  }

  remove(){
    this.saving = true
    this.api.GuestsService.remove(this.selected_guest.id).subscribe( res => {
      this.refresher$.next(null)
    })
  }


  getGuests(page = 1){
    console.log(page)
    this.api.GuestsService.index(page).subscribe((res:any) => {
      this.guests = res.data
      this.pagination = res.pagination
    });
  }
  

  ngOnInit(): void {

    console.log(this.api.modal_template)

    this.api.breadcrumbs[1] = 'Guests'

    this.getGuests()

    this.refresher$.subscribe( _ => {
      this.getGuests()
      this.api.close_modal()
      this.saving = false;
    })

    
  }
}
