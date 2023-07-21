import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Product } from '../../models/product';

import { ProductsService } from '../../services/products/product.service';
import { takeUntil,Subject } from 'rxjs';
import { CartItems, CartServiceService } from '@riti/order';

@Component({
    selector: 'products-product-page-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit,OnDestroy {
   product :Product;

   endsub$ :Subject<any>=new Subject();
   quantity=1;

   constructor(private productService :ProductsService , private route :ActivatedRoute ,private cartService :CartServiceService){}
    ngOnDestroy(): void {
        this.endsub$.next;
       this.endsub$.complete();
    }

    ngOnInit(): void {
       this.route.params.subscribe(param =>{
        if(param['id']){
            this._getProduct(param['id']);
        }
       })
    }

    private _getProduct(id :string){
        return this.productService.getProduct(id).pipe(takeUntil(this.endsub$)).subscribe(resProduct =>{
            this.product = resProduct;
        });
    }

    addToCart(){
        const productToAdd :CartItems = {
            productId :this.product.id,
            name: this.product.name,
            quantity : this.quantity
        }
        this.cartService.setCartItem(productToAdd);
    }
}
