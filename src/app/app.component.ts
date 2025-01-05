import { Component } from '@angular/core';

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
  protected readonly breadcrumbs = ['Home', 'Angular', 'Repositories', 'Taiga UI'];


  protected readonly drawer = {
    Components: [
        {name: 'Button', icon: "ICON"},
        {name: 'Input', icon: "ICON"},
        {name: 'Tooltip', icon: "ICON"},
    ],
    Essentials: [
        {name: 'Getting started', icon: "ICON"},
        {name: 'Showcase', icon: "ICON"},
        {name: 'Typography', icon: "ICON"},
    ],
};
  protected readonly routes: any = {};

  
}
