import { Injectable, TemplateRef } from '@angular/core';
import { GuestsService } from './guests.service';

export interface Pagination{
  index:number;
  length:number;
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public GuestsService: GuestsService) {}



  breadcrumbs:Array<string> = ['Home'];

  close_modal = () => document.getElementById('modal_closer')?.click()
  open_modal = () => document.getElementById('modal_opener')?.click()

  modal_template: { template: TemplateRef<any> | null; header: string | null } =
    { template: null, header: null };

}
