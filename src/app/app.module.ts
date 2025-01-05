import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiDropdownService, TuiIcon, TuiLink, TuiRoot, TuiScrollbar, TuiTextfield, TuiTitle } from "@taiga-ui/core";
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

import {TuiCardLarge, TuiForm, TuiHeader, TuiNavigation} from '@taiga-ui/layout';


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { GuestsComponent } from './guests/guests.component';
import { tuiAsPortal } from "@taiga-ui/cdk/classes";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    GuestsComponent
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
      TuiCardLarge, TuiForm, TuiHeader, 
      TuiNavigation,
      TuiScrollbar,
      TuiDataListWrapper,
      TuiPagination
],
  providers: [NG_EVENT_PLUGINS, TuiDropdownService, tuiAsPortal(TuiDropdownService), provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
