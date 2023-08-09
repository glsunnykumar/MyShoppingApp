import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../../models/product';


import { Environment, ENVIRONMENT } from '@riti/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    apiURLProducts:string ; // = environment.apiURL+'products';
    constructor(private httpclient: HttpClient,
        @Inject(ENVIRONMENT) private env: Environment
        ) {
            this.apiURLProducts = env.apiURL +'products';
    }

    addProduct(product: FormData): Observable<Product> {
        return this.httpclient.post<Product>(this.apiURLProducts, product);
    }

    deleteProduct(productId: string): Observable<Product> {
        console.log(this.apiURLProducts);
        return this.httpclient.delete<Product>(`${this.apiURLProducts}/${productId}`);
    }

    getProducts(categoryFilter ?:string[]): Observable<Product[]> {
        let params = new HttpParams()
        if(categoryFilter){
            params = params.append('categories' ,categoryFilter.join(',')); 
        }
        return this.httpclient.get<Product[]>(this.apiURLProducts ,{'params' : params});
    }

    getProduct(productId: string): Observable<Product> {
        return this.httpclient.get<Product>(`${this.apiURLProducts}/${productId}`);
    }

    getProductCount(): Observable<number> {
        return this.httpclient
          .get<number>(`${this.apiURLProducts}/get/count`)
          .pipe(map((objectValue:any) => objectValue.count));
      }

    getFeaturedProduct(count :number):Observable<Product[]>{
        return this.httpclient
        .get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
    }
    updateProduct(product :FormData,productId : string): Observable<Product>{
      return this.httpclient.put<Product>(`${this.apiURLProducts}/`+productId, product);
  }
}
