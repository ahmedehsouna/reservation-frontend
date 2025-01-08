import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import {
  TuiAppearance,
  TuiButton,
  TuiCalendar,
  TuiDataList,
  TuiDropdown,
  TuiDropdownService,
  TuiHintDirective,
  TuiIcon,
  TuiLink,
  TuiOption,
  TuiRoot,
  TuiScrollbar,
  TuiSelect,
  TuiTextfield,
  TuiTitle,
  tuiDateFormatProvider,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiBreadcrumbs,
  TuiChevron,
  TuiDataListDropdownManager,
  TuiDataListWrapper,
  TuiFade,
  TuiPagination,
  TuiSwitch,
  TuiTabs,
} from '@taiga-ui/kit';

import {
  TuiCardLarge,
  TuiForm,
  TuiHeader,
  TuiNavigation,
} from '@taiga-ui/layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestsComponent } from './guests/guests.component';
import { tuiAsPortal } from '@taiga-ui/cdk/classes';
import { provideHttpClient } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { TuiComboBoxModule, TuiInputDateTimeModule, TuiMultiSelectModule } from '@taiga-ui/legacy';
import { CalendarComponent } from './calendar/calendar.component';
import { ShowComponent as ShowGuestComponent } from './guests/show/show.component';
import { ShowComponent as ShowRoomComponent } from './rooms/show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestsComponent,
    ModalComponent,
    HomeComponent,
    RoomsComponent,
    ReservationsComponent,
    CalendarComponent,
    ShowGuestComponent,
    ShowRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRoot,
    TuiButton,
    TuiAppearance,
    TuiDataList,
    TuiDropdown,
    TuiIcon,
    TuiLink,
    TuiTextfield,
    TuiTitle,
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiBreadcrumbs,
    TuiChevron,
    TuiDataListDropdownManager,
    TuiFade,
    TuiSwitch,
    TuiTabs,
    FormsModule,
    TuiCardLarge,
    TuiForm,
    TuiHeader,
    TuiNavigation,
    TuiScrollbar,
    TuiDataListWrapper,
    TuiPagination,
    TuiOption,
    CommonModule,
    FormsModule,
    TuiForm,
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    TuiComboBoxModule,
    TuiMultiSelectModule,
    DatePipe,
    TuiCalendar,
    TuiHintDirective,
    TuiSelect,
  ],
  providers: [
    NG_EVENT_PLUGINS,
    TuiDropdownService,
    tuiAsPortal(TuiDropdownService),
    provideHttpClient(),
    tuiDateFormatProvider({ mode: 'YMD', separator: '-' }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
