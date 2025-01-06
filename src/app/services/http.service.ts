import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  dev: string = "http://localhost:3000/api/";
  base:string = this.dev
  get(route:string, params?:any) {
    return this.http.get(this.base + route, {params});
  }
  post(route:string, json:any) {
    return this.http.post(this.base + route, json);
  }
  put(route:string, json:any) {
      return this.http.put(this.base + route , json);
  }
  delete(route:string) {
    return this.http.delete(this.base + route);
  }

}
