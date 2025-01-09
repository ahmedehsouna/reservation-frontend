import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';
import { Room } from './rooms.service';
import { Guest } from './guests.service';
import { TuiDay, TuiTime } from '@taiga-ui/cdk/date-time';

export interface Reservation {
  start: Date;
  end: Date;
  rooms: Array<Room>,
  guest:Guest,
  rooms_open?: boolean,
  is_current?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ReservationsService extends HttpService {

  index(page:number){
    return super.get('reservations', {page})
  }

  store(form:NgForm){
    console.log(form.form.value)
    let data = {
      start: this.reverseTaigaDate(form.form.value.start),
      end: this.reverseTaigaDate(form.form.value.end),
      guest_id: form.form.value.guest?.id,
      rooms_ids: form.form.value.rooms?.map((room:any) => room.id)
    }
    return super.post('reservations', data)
  }

  update(form:NgForm){
    return super.put('reservations/' + form.form.value['id'], form.form.value)
  }

  remove(id:number){
    return super.delete('reservations/' + id)
  }

  getGuestReservations(id:any){
    return super.get(`guests/${id}/reservations`)
  }

  getRoomReservations(id:any){
    return super.get(`rooms/${id}/reservations`)
  }

  countReservationsMonthly(start:any, end:any){
    return super.get(`reservations/monthly`, {start,end})
  }

  getReservationsByDay(day:any){
    return super.get(`reservations/by-day`, {day})
  }
  
  reverseTaigaDate = (taiga_date:[string, TuiTime]) => `${taiga_date[0]}`.split('.').reverse().join('-') + ':' + taiga_date[1].hours + ":" + taiga_date[1].minutes


}
