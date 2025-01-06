import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';


export interface Guest {
  name: string;
  email: string;
  phone_number: string;
}

@Injectable({
  providedIn: 'root'
})
export class GuestsService extends HttpService {

  index(page:number){
    return super.get('guests', {page})
  }

  store(form:NgForm){
    return super.post('guests', form.form.value)
  }

  update(form:NgForm){
    return super.put('guests/' + form.form.value['id'], form.form.value)
  }

  remove(id:number){
    return super.delete('guests/' + id)
  }
  


}
