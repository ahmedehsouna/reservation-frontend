import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HttpService {

  index(){
    return super.get('home')
  }

  


}
