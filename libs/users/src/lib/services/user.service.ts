import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => { locale: string; countries: { [alpha2Key: string]: string | string[]; }; };

import { Environment, ENVIRONMENT } from '@riti/environment';
import { UsersFacade } from '../state/users.facade';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiURLUsers : string; //= environment.apiURL +'users';
    constructor(private httpclient: HttpClient ,
      private userFacade :UsersFacade,
      @Inject(ENVIRONMENT) private env: Environment
      ) {
        this.apiURLUsers = this.env.apiURL +'users';
        this.getUsers().subscribe();
    }

    

    createUser(user: User): Observable<User> {
        return this.httpclient.post<User>(this.apiURLUsers, user);
    }

    deleteUser(categoryId: string): Observable<User> {
        return this.httpclient.delete<User>(`${this.apiURLUsers}/${categoryId}`);
    }

    getCountryName(countryKey: string) :string {
        countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
       // if (countryKey) return this.usersService.getCountry(countryKey);
        return countriesLib.getName(countryKey,"en"); // United Kingdom
      }

      getCountries() :{id:string,name:string}[] {
        
        countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
       return Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry =>{
           return{
            id : entry[0],
            name : entry[1]
           }
        })
      
    }

    getUsers(): Observable<User[]> {
        return this.httpclient.get<User[]>(this.apiURLUsers);
    }

    getUser(categoryId: string): Observable<User> {
        return this.httpclient.get<User>(`${this.apiURLUsers}/${categoryId}`);
    }

    getUsersCount(): Observable<number> {
        return this.httpclient
          .get<number>(`${this.apiURLUsers}/get/count`)
          .pipe(map((objectValue: any) => objectValue.count));
      }

    updateUser(category :User): Observable<User>{
      return this.httpclient.put<User>(`${this.apiURLUsers}/${category.id}`, category);
  }

  initAppSession(){
  this.userFacade.buildUserSession();
  }

  observeCurrentUser(){
    return this.userFacade.currentUser$;
  }

  isCurrentUserAuthenticated(){
    return this.userFacade.isAuthenticated$;
  }
   
}
