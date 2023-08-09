import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, ENVIRONMENT } from '@riti/environment';

@Injectable({
  providedIn: 'root'
})


export class DashbordStaticsService {
  apiURLUsers: string; // = environment.apiURL +'users';
  apiURLProducts:string; //= environment.apiURL +'products';
  apiURLOrders:string; //= environment.apiURL +'orders';


  constructor(private http : HttpClient,
    @Inject(ENVIRONMENT) private env: Environment
    ) {
      this.apiURLUsers = this.env.apiURL + 'users';
      this.apiURLProducts = this.env.apiURL + 'products';
      this.apiURLOrders = this.env.apiURL +'orders';
     }

  getOrders(){
   return this.http.get(`${this.apiURLOrders}`);
  }
}
