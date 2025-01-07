import { Injectable, TemplateRef } from '@angular/core';
import { GuestsService } from './guests.service';
import { RoomsService } from './rooms.service';
import { Observable, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ReservationsService } from './reservations.service';
import { TuiDay, TuiTime } from '@taiga-ui/cdk/date-time';
import { HomeService } from './home.service';

export interface Pagination {
  index: number;
  length: number;
}

interface RequestHandlerOptions {
  request: Observable<any>;
  refresher?: Subject<any>;
  form?: NgForm;
  modal?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public GuestsService: GuestsService,
    public RoomsService: RoomsService,
    public ReservationsService: ReservationsService,
    public HomeService:HomeService
  ) {}

  errors_object: any = {};


  RequestHandler({ request, refresher, form }: RequestHandlerOptions) {
    let errors_object = this.errors_object;
    if (form) form.form.disable();
    request.subscribe((res) => {
      if (res.error) {
        if (form && errors_object) {
          Object.keys(errors_object).forEach(
            (key) => delete errors_object[key]
          );
          res.errors.forEach((err: any) => {
            errors_object[err.path] = err.msg;
          });
          form.form.enable();
        }
      } else {
        if (errors_object)
          Object.keys(errors_object).forEach(
            (key) => delete errors_object[key]
          );
        refresher?.next(res);
        this.close_modal();
        if (form) form.form.enable();
      }
    });
  }

  breadcrumbs: Array<string> = ['Home'];

  close_modal = () => document.getElementById('modal_closer')?.click();
  open_modal = () => document.getElementById('modal_opener')?.click();

  modal_template: { template: TemplateRef<any> | null; header: string | null } =
    { template: null, header: null };
}
