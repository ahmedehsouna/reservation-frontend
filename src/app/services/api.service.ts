import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




export interface Guest {
  name:string;
  email:string;
  phone_number:string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }
  // get_token = ()=> {
  //   return localStorage.getItem("token")
  // }

  dev: string = "http://localhost:3000/api/";
  base:string = this.dev
  // token = this.get_token() || "";
  get(route:string, query = "", params?:any) {
    return this.http.get(this.base + route + query);
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
