import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestsComponent } from './guests/guests.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
  },


  {
    path: "guests",
    component: GuestsComponent,
  },

  {
    path: "rooms",
    component: RoomsComponent,
  },

  {
    path: "reservations",
    component: ReservationsComponent,
  },

  {
    path:"**",
    redirectTo:'/'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
