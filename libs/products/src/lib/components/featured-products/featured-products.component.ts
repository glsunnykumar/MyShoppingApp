import { Component,OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/product.service';
import {Subject,takeUntil} from 'rxjs';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit {
    featuredProducts :Product[] =[];

    endSub$:Subject<any> = new Subject();

    constructor(private productService :ProductsService){

    }

    ngOnInit(): void {
     this.productService.getFeaturedProduct(4).pipe(takeUntil(this.endSub$)).subscribe(product =>{
        this.featuredProducts = product
     })
    }
}
