import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {


  constructor(private api:ApiService){}

  stats: any = {}

  routes: Array<string> = ['guests', 'reservations', 'rooms']
  ngOnInit(): void {
    this.api.breadcrumbs.length === 2 && this.api.breadcrumbs.pop() 

    this.api.HomeService.index().subscribe((res:any) => {
      this.stats = res['data']
    })

  }

}
