import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';

export interface Room {
  name: string;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends HttpService {

  index(page:number){
    return super.get('rooms', {page})
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
