import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reservation-frontend';
  expanded = true;
  open = false;
  protected switch = false;



  protected readonly routes: any = {};

  constructor(public api:ApiService){

  }

  
}
