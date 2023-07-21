import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router :Router ,private localStorageToken : LocalstorageService) {
    
  }

canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
  const token = this.localStorageToken.getToken();

  if(token)
  {
    const decodeToken =JSON.parse(atob(token.split('.')[1]));
    if(decodeToken.isAdmin && !this._getTokenExp(decodeToken.exp))
    return true;
  }
  this.router.navigateByUrl('/login');
  return false;
}

private _getTokenExp(expiration) :boolean{
return Math.floor(new Date().getTime()/1000) >= expiration;
}
}