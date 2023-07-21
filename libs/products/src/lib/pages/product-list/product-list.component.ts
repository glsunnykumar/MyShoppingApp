import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/product.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../services/categories/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'products-product-list',
    templateUrl: './product-list.component.html',
    styles: []
})
export class ProductListComponent implements OnInit,OnDestroy {
    products :Product[] =[];
    categories: Category[]=[];

    endSub$ :Subject<any> = new Subject();
    isCategoryPage :boolean;

    constructor(private productService :ProductsService ,
        private categoryService :CategoryService,
        private route :ActivatedRoute
        ){

    }
    ngOnDestroy(): void {
       this.endSub$.complete();
    }

    ngOnInit(): void {
      
     this.route.params.subscribe((params) =>{
        params['categoryid'] ?this._getProducts([params['categoryid']]):this._getProducts();
        params['categoryid'] ? this.isCategoryPage =true :this.isCategoryPage =false;
     })
     this._getCategories();
    }

    catgeoryFilter(){
        const categoryFilter = this.categories.filter(category => category.checked).map(category => category.id);
        this._getProducts(categoryFilter);
    }

    private _getProducts(category ?:string[]){
        this.productService.getProducts(category).pipe(takeUntil(this.endSub$)).subscribe(products =>{
            this.products = products
           })
    }

    private _getCategories(){
        this.categoryService.getCategories().pipe(takeUntil(this.endSub$)).subscribe(resCategory =>{
            this.categories = resCategory
           })
    }


}
