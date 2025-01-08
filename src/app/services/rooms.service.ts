import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';
import { Reservation } from './reservations.service';

export interface Room {
  name: string;
  number: number;
  upcoming_reservations_count: number,
  id:string
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends HttpService {

  index(page:number, sort_by:string = 'number', order:string = 'desc') {
    return super.get('rooms', {page, sort_by, order})
  }

  show(id:any){
    return super.get('rooms/' + id)
  }

  store(form:NgForm){
    return super.post('rooms', form.form.value)
  }

  update(form:NgForm){
    return super.put('rooms/' + form.form.value['id'], form.form.value)
  }

  remove(id:number){
    return super.delete('rooms/' + id)
  }
  


}
