import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';


import {environment}  from  '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    apiURLCategories = environment.apiURL +'categories';
    constructor(private httpclient: HttpClient) {
        this.getCategories().subscribe();
    }

    addCategory(category: Category): Observable<Category> {
        return this.httpclient.post<Category>(this.apiURLCategories, category);
    }

    deleteCategory(categoryId: string): Observable<Category> {
        return this.httpclient.delete<Category>(`${this.apiURLCategories}/${categoryId}`);
    }

    getCategories(): Observable<Category[]> {
        return this.httpclient.get<Category[]>(this.apiURLCategories);
    }

    getCategory(categoryId: string): Observable<Category> {
        return this.httpclient.get<Category>(`${this.apiURLCategories}/${categoryId}`);
    }

    updateCategory(category :Category): Observable<Category>{
      return this.httpclient.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
  }
}
