import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Environment, ENVIRONMENT } from '@riti/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  environment : string;

  constructor(private localStorageService :LocalstorageService ,
    @Inject(ENVIRONMENT) private env: Environment
    ) {
      this.environment = this.env.apiURL;
    }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getToken();
    const isApiUrl = request.url.startsWith(this.environment);
    if(token && isApiUrl){
      request = request.clone( {
          setHeaders :{
            Authorization :`Bearer ${token}`
          }
        }
      )
    }

    return next.handle(request);
  }
}
