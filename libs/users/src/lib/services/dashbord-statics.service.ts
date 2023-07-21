import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})


export class DashbordStaticsService {
  apiURLUsers = environment.apiURL +'users';
  apiURLProducts = environment.apiURL +'products';
  apiURLOrders = environment.apiURL +'orders';


  constructor(private http : HttpClient) { }

  getOrders(){
   return this.http.get(`${this.apiURLOrders}`);
  }
}
