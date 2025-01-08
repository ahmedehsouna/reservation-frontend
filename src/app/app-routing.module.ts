import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestsComponent } from './guests/guests.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ShowComponent as ShowGuestComponent } from './guests/show/show.component';
import { ShowComponent as ShowRoomComponent } from './rooms/show/show.component';

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
    path: "guests/:id",
    component: ShowGuestComponent,
  },

  

  {
    path: "rooms",
    component: RoomsComponent,
  },

  {
    path: "rooms/:id",
    component: ShowRoomComponent,
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
