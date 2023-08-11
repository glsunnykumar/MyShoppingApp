import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

import { Environment, ENVIRONMENT } from '@riti/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUsers : string; //= environment.apiURL +'users';

  constructor(private http : HttpClient,private localStorage : LocalstorageService ,
    private router :Router,
    @Inject(ENVIRONMENT) private env: Environment
    ) { 
      this.apiURLUsers = this.env.apiURL +'users';
    }

  login(email: string , password : string) :Observable<User>{
    return this.http.post<User>(`${this.apiURLUsers}/login`,{email,password});
  }

  logtout(){
    this.localStorage.clearToken();
    this.router.navigate(['/login']);
  }
}
